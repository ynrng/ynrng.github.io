(() => {
    const svg = document.getElementById('elm-chart');
    const status = document.getElementById('elm-chart-status');
    if (!svg || !status) return;

    const namespace = 'http://www.w3.org/2000/svg';
    const width = 800;
    const height = 420;
    const margin = { top: 24, right: 24, bottom: 76, left: 76 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    function element(name, attributes = {}, text = '') {
        const node = document.createElementNS(namespace, name);
        Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
        node.textContent = text;
        return node;
    }

    function niceStep(range, count) {
        const roughStep = range / count;
        const magnitude = 10 ** Math.floor(Math.log10(roughStep));
        const fraction = roughStep / magnitude;
        const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
        return niceFraction * magnitude;
    }

    function drawChart(rows) {
        const minTime = Math.min(...rows.map((row) => row.time));
        const maxTime = Math.max(...rows.map((row) => row.time));
        const minCost = Math.min(...rows.map((row) => row.cost));
        const maxCost = Math.max(...rows.map((row) => row.cost));
        const timeRange = maxTime - minTime || 1;
        const costPadding = (maxCost - minCost || Math.abs(maxCost) * 0.1 || 1) * 0.1;
        const yMin = minCost - costPadding;
        const yMax = maxCost + costPadding;
        const x = (time) => margin.left + ((time - minTime) / timeRange) * plotWidth;
        const y = (cost) => margin.top + ((yMax - cost) / (yMax - yMin)) * plotHeight;

        svg.replaceChildren();
        svg.append(
            element('title', {}, 'ELM cost over time'),
            element('desc', {}, `Cost from ${new Date(minTime).toLocaleString()} to ${new Date(maxTime).toLocaleString()}.`)
        );

        const step = niceStep(yMax - yMin, 5);
        const firstTick = Math.ceil(yMin / step) * step;
        for (let tick = firstTick; tick <= yMax; tick += step) {
            const tickY = y(tick);
            svg.append(
                element('line', {
                    x1: margin.left, x2: width - margin.right, y1: tickY, y2: tickY,
                    stroke: 'currentColor', 'stroke-opacity': '0.18'
                }),
                element('text', {
                    x: margin.left - 12, y: tickY + 5, 'text-anchor': 'end',
                    fill: 'currentColor', 'font-size': '13'
                }, tick.toFixed(2))
            );
        }

        const xTickCount = Math.min(5, rows.length);
        for (let index = 0; index < xTickCount; index += 1) {
            const tickTime = minTime + (timeRange * index) / Math.max(1, xTickCount - 1);
            const tickX = x(tickTime);
            svg.append(
                element('line', {
                    x1: tickX, x2: tickX, y1: margin.top, y2: height - margin.bottom,
                    stroke: 'currentColor', 'stroke-opacity': '0.12'
                }),
                element('text', {
                    x: tickX, y: height - margin.bottom + 20, 'text-anchor': 'middle',
                    fill: 'currentColor', 'font-size': '12'
                }, new Date(tickTime).toLocaleString(undefined, {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                }))
            );
        }

        svg.append(
            element('line', {
                x1: margin.left, x2: margin.left, y1: margin.top, y2: height - margin.bottom,
                stroke: 'currentColor'
            }),
            element('line', {
                x1: margin.left, x2: width - margin.right, y1: height - margin.bottom, y2: height - margin.bottom,
                stroke: 'currentColor'
            }),
            element('text', {
                x: margin.left + plotWidth / 2, y: height - 14, 'text-anchor': 'middle',
                fill: 'currentColor', 'font-size': '14'
            }, 'Time'),
            element('text', {
                x: 20, y: margin.top + plotHeight / 2, 'text-anchor': 'middle',
                fill: 'currentColor', 'font-size': '14',
                transform: `rotate(-90 20 ${margin.top + plotHeight / 2})`
            }, 'Cost'),
            element('polyline', {
                points: rows.map((row) => `${x(row.time)},${y(row.cost)}`).join(' '),
                fill: 'none', stroke: '#2678c8', 'stroke-width': '3',
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            })
        );

        rows.forEach((row) => {
            svg.append(element('circle', {
                cx: x(row.time), cy: y(row.cost), r: '4', fill: '#2678c8'
            }));
        });
    }

    fetch('/assets/elm.csv')
        .then((response) => {
            if (!response.ok) throw new Error(`Request failed (${response.status})`);
            return response.text();
        })
        .then((csv) => {
            const lines = csv.trim().split(/\r?\n/);
            const headers = lines.shift()?.split(',').map((header) => header.trim());
            const timeColumn = headers?.indexOf('time') ?? -1;
            const costColumn = headers?.indexOf('cost') ?? -1;
            if (timeColumn < 0 || costColumn < 0) {
                throw new Error('CSV must contain time and cost columns');
            }

            const rows = lines.map((line) => {
                const fields = line.split(',');
                return {
                    time: Date.parse(fields[timeColumn]?.trim()),
                    cost: Number(fields[costColumn]?.trim())
                };
            }).filter((row) => Number.isFinite(row.time) && Number.isFinite(row.cost));

            if (rows.length === 0) throw new Error('CSV contains no valid data rows');
            drawChart(rows);
            status.textContent = `${rows.length} data points`;
        })
        .catch((error) => {
            status.textContent = `Unable to load chart: ${error.message}`;
        });
})();



// updateCountdown("2026-03-21", "2026-03-28", "Avoriaz, France");
function updateCountdown(txtname, s, e, p) {
    let startDate = new Date(s || Date.now());
    let endDate = e? new Date(e ) : '';
    let place = p || '';

    const calculateRemainingDays = () => {
        const diff = startDate.getTime() - Date.now();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    let daysLeft = calculateRemainingDays();

    let str = '';


    if (daysLeft > 0) {
        str += startDate.toDateString()
        if (endDate) {
            str += ` - ${endDate.toDateString()}`;
        }
        str+= `. <br/><span style="font-size: xxx-large;color: red;">${daysLeft}</span> Days Until ${place}`;
    } else {
        str += `${place} was ${endDate?'from':'on'} `;
        str += startDate.toLocaleDateString()
        if (endDate) {
            str += ` - ${endDate.toLocaleDateString()}`;
        }
        str += '.';
    }

    document.getElementById(txtname).innerHTML = str;
}
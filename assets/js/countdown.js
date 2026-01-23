

// updateCountdown("2026-03-21", "2026-03-28", "Avoriaz, France");
function updateCountdown(txtname, s, e, p) {
    let startDate = new Date(s || "2026-03-21");
    let endDate = new Date(e || "2026-03-28");
    let place = p || 'Avoriaz, France';

    const calculateRemainingDays = () => {
        const diff = startDate.getTime() - Date.now();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    let daysLeft = calculateRemainingDays();


    document.getElementById(txtname).innerHTML =
        daysLeft > 0 ? `${startDate.toDateString()} - ${endDate.toDateString()}. <br/><span style="font-size: xxx-large;color: red;">${daysLeft}</span> Days Until ${place}` :
            `${place} was from ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}.`;
}
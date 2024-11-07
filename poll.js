 const SPREADSHEET_ID = '1tFFBzwbXguYrGbmbgiROuROWaRLf17Mk4gj0sFv5gy8';
const API_KEY = 'AIzaSyBzFsH8ZXO4aJcufCYmwxZVBe2MqYxU8DM';
const range = 'Form Responses 1!B2:B';   
const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
            const voteCounts = {
                "BJP": 0,
                "CONG": 0,
                "BSP": 0,
                "SP": 0,
                "AAP": 0,
                "Other": 0
            };

            
            data.values.forEach(row => {
                const vote = row[0];   
                if (voteCounts.hasOwnProperty(vote)) {
                    voteCounts[vote]++;
                } else {
                    voteCounts["Other"]++; 
                }
            });

             const labels = Object.keys(voteCounts);
            const values = Object.values(voteCounts);

            updateChart(labels, values);  
        } else {
            console.error('No data found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateChart(labels, values) {
    const ctx = document.getElementById('myChart').getContext('2d');

     if (window.myChart instanceof Chart) {
        window.myChart.destroy(); 
    }

     window.myChart = new Chart(ctx, {
        type: 'pie',   
        data: {
            labels: labels,
            datasets: [{
                label: 'Poll Results',
                data: values,
                backgroundColor: [
                    '#FF6347',  // BJP (Red)
                    '#4682B4',  // CONG (Blue)
                    '#32CD32',  // BSP (Green)
                    '#FFD700',  // SP (Yellow)
                    '#8A2BE2',  // AAP (Purple)
                    '#A9A9A9'   // Other (Grey)
                ],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw} votes`;  
                        }
                    }
                }
            }
        }
    });
}

window.onload = fetchData;

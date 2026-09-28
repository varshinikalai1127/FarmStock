const API = "/api";


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    loadCrops();

    const today =
        new Date().toISOString().split("T")[0];

    document.getElementById("harvestDate").value =
        today;

    document.getElementById("saleDate").value =
        today;

});


// ==========================================
// LOAD CROPS
// ==========================================

async function loadCrops() {

    try {

        const response =
            await fetch(`${API}/crops`);

        if (!response.ok) {
            throw new Error("Unable to load crops");
        }

        const crops =
            await response.json();


        // Total crop count

        document.getElementById("cropCount")
            .textContent = crops.length;


        // Crop table

        const tableBody =
            document.getElementById(
                "cropTableBody"
            );

        tableBody.innerHTML = "";


        // Dropdowns

        const dropdowns = [

            "harvestCrop",
            "saleCrop",
            "historyCrop"

        ];


        dropdowns.forEach(function (id) {

            const select =
                document.getElementById(id);

            select.innerHTML =
                '<option value="">Select Crop</option>';


            crops.forEach(function (crop) {

                const option =
                    document.createElement("option");

                option.value =
                    crop.id;

                option.textContent =
                    `${crop.id} - ${crop.name}`;

                select.appendChild(option);

            });

        });


        // Crop table

        crops.forEach(function (crop) {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${crop.id}</td>

                <td>${crop.name}</td>

                <td>

                    <button
                        onclick="deleteCrop(${crop.id})">

                        Delete

                    </button>

                </td>

            `;

            tableBody.appendChild(row);

        });


        loadOverallDashboard();

    }

    catch (error) {

        console.error(error);

        showMessage(
            "cropMessage",
            "Unable to connect to backend.",
            false
        );

    }

}


// ==========================================
// ADD CROP
// ==========================================

async function addCrop() {

    const name =
        document.getElementById(
            "cropName"
        ).value.trim();


    if (!name) {

        showMessage(
            "cropMessage",
            "Please enter crop name.",
            false
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API}/crops`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name: name
                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Failed to add crop"
            );

        }


        document.getElementById(
            "cropName"
        ).value = "";


        showMessage(
            "cropMessage",
            "Crop added successfully!",
            true
        );


        loadCrops();

    }

    catch (error) {

        showMessage(
            "cropMessage",
            error.message,
            false
        );

    }

}


// ==========================================
// DELETE CROP
// ==========================================

async function deleteCrop(id) {

    if (!confirm(
        "Are you sure you want to delete this crop?"
    )) {

        return;
    }


    try {

        const response =
            await fetch(
                `${API}/crops/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            const data =
                await response.json();

            throw new Error(
                data.error ||
                "Unable to delete crop"
            );

        }


        loadCrops();

    }

    catch (error) {

        alert(error.message);

    }

}


// ==========================================
// ADD HARVEST
// ==========================================

async function addHarvest() {

    const cropId =
        document.getElementById(
            "harvestCrop"
        ).value;

    const quantity =
        document.getElementById(
            "harvestQuantity"
        ).value;

    const harvestDate =
        document.getElementById(
            "harvestDate"
        ).value;


    if (!cropId ||
        !quantity ||
        !harvestDate) {

        showMessage(
            "harvestMessage",
            "Please fill all fields.",
            false
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API}/harvests`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        crop: {
                            id: Number(cropId)
                        },

                        quantity:
                            Number(quantity),

                        harvestDate:
                        harvestDate

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Failed to add harvest"
            );

        }


        document.getElementById(
            "harvestQuantity"
        ).value = "";


        showMessage(
            "harvestMessage",
            "Harvest added successfully!",
            true
        );


        // Automatically show updated history

        document.getElementById(
            "historyCrop"
        ).value = cropId;

        viewCropHistory();

    }

    catch (error) {

        showMessage(
            "harvestMessage",
            error.message,
            false
        );

    }

}


// ==========================================
// RECORD SALE
// ==========================================

async function addSale() {

    const cropId =
        document.getElementById(
            "saleCrop"
        ).value;

    const quantity =
        document.getElementById(
            "saleQuantity"
        ).value;

    const price =
        document.getElementById(
            "salePrice"
        ).value;

    const saleDate =
        document.getElementById(
            "saleDate"
        ).value;


    if (!cropId ||
        !quantity ||
        !price ||
        !saleDate) {

        showMessage(
            "saleMessage",
            "Please fill all fields.",
            false
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API}/sales`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        crop: {
                            id: Number(cropId)
                        },

                        quantity:
                            Number(quantity),

                        price:
                            Number(price),

                        saleDate:
                        saleDate

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Failed to record sale"
            );

        }


        document.getElementById(
            "saleQuantity"
        ).value = "";

        document.getElementById(
            "salePrice"
        ).value = "";


        showMessage(
            "saleMessage",
            "Sale recorded successfully!",
            true
        );


        // Automatically show updated history

        document.getElementById(
            "historyCrop"
        ).value = cropId;

        viewCropHistory();

    }

    catch (error) {

        showMessage(
            "saleMessage",
            error.message,
            false
        );

    }

}


// ==========================================
// CROP HISTORY
// ==========================================

async function viewCropHistory() {

    const cropId =
        document.getElementById(
            "historyCrop"
        ).value;


    if (!cropId) {

        alert("Please select a crop.");

        return;
    }


    try {

        // Get crop

        const cropsResponse =
            await fetch(
                `${API}/crops`
            );

        const crops =
            await cropsResponse.json();


        const crop =
            crops.find(
                c => Number(c.id) === Number(cropId)
            );


        // Get harvest history

        const harvestResponse =
            await fetch(
                `${API}/harvests/crop/${cropId}`
            );

        const harvests =
            await harvestResponse.json();


        // Get sale history

        const saleResponse =
            await fetch(
                `${API}/sales/crop/${cropId}`
            );

        const sales =
            await saleResponse.json();


        // Calculate totals

        const totalHarvest =
            harvests.reduce(
                (sum, h) =>
                    sum + Number(h.quantity),
                0
            );


        const totalSold =
            sales.reduce(
                (sum, s) =>
                    sum + Number(s.quantity),
                0
            );


        const currentStock =
            totalHarvest - totalSold;


        const totalRevenue =
            sales.reduce(
                (sum, s) =>
                    sum +
                    (
                        Number(s.quantity) *
                        Number(s.price)
                    ),
                0
            );


        /*
         Previous Stock

         For a selected crop's complete history,
         the current total stock is calculated as:

         Total Harvest - Total Sold
        */

        const previousStock =
            currentStock;


        // Dashboard values

        document.getElementById(
            "totalHarvest"
        ).textContent =
            `${totalHarvest} kg`;


        document.getElementById(
            "totalSold"
        ).textContent =
            `${totalSold} kg`;


        document.getElementById(
            "stockValue"
        ).textContent =
            `${currentStock} kg`;


        document.getElementById(
            "revenueValue"
        ).textContent =
            `₹${totalRevenue.toFixed(2)}`;


        // Build history HTML

        let html = `

            <h3>
                🌾 ${crop ? crop.name : "Crop"} History
            </h3>


            <div class="history-summary">

                <div class="history-box">

                    <h4>Current Stock</h4>

                    <p>
                        ${currentStock} kg
                    </p>

                </div>


                <div class="history-box">

                    <h4>Total Harvest</h4>

                    <p>
                        ${totalHarvest} kg
                    </p>

                </div>


                <div class="history-box">

                    <h4>Total Sold</h4>

                    <p>
                        ${totalSold} kg
                    </p>

                </div>


                <div class="history-box">

                    <h4>Total Revenue</h4>

                    <p>
                        ₹${totalRevenue.toFixed(2)}
                    </p>

                </div>

            </div>


            <h3 class="history-title">
                🌾 Harvest History
            </h3>

        `;


        // Harvest table

        if (harvests.length === 0) {

            html += `
                <p>No harvest records found.</p>
            `;

        }

        else {

            html += `

                <table>

                    <thead>

                        <tr>

                            <th>Date</th>

                            <th>Quantity</th>

                        </tr>

                    </thead>

                    <tbody>

            `;


            harvests.forEach(function (h) {

                html += `

                    <tr>

                        <td>
                            ${h.harvestDate}
                        </td>

                        <td>
                            ${h.quantity} kg
                        </td>

                    </tr>

                `;

            });


            html += `

                    </tbody>

                </table>

            `;

        }


        // Sales

        html += `

            <h3 class="history-title">
                💰 Sale History
            </h3>

        `;


        if (sales.length === 0) {

            html += `
                <p>No sales records found.</p>
            `;

        }

        else {

            html += `

                <table>

                    <thead>

                        <tr>

                            <th>Date</th>

                            <th>Quantity</th>

                            <th>Price/kg</th>

                            <th>Revenue</th>

                        </tr>

                    </thead>

                    <tbody>

            `;


            sales.forEach(function (s) {

                const revenue =
                    Number(s.quantity) *
                    Number(s.price);


                html += `

                    <tr>

                        <td>
                            ${s.saleDate}
                        </td>

                        <td>
                            ${s.quantity} kg
                        </td>

                        <td>
                            ₹${Number(s.price).toFixed(2)}
                        </td>

                        <td>
                            ₹${revenue.toFixed(2)}
                        </td>

                    </tr>

                `;

            });


            html += `

                    </tbody>

                </table>

            `;

        }


        document.getElementById(
            "historyResult"
        ).innerHTML = html;

    }

    catch (error) {

        console.error(error);

        document.getElementById(
            "historyResult"
        ).innerHTML = `
            <p class="message-error">
                Unable to load crop history.
            </p>
        `;

    }

}


// ==========================================
// OVERALL DASHBOARD
// ==========================================

async function loadOverallDashboard() {

    try {

        const response =
            await fetch(`${API}/crops`);

        const crops =
            await response.json();


        let totalHarvest = 0;
        let totalSold = 0;
        let totalRevenue = 0;


        for (const crop of crops) {

            const harvestResponse =
                await fetch(
                    `${API}/harvests/crop/${crop.id}`
                );

            const harvests =
                await harvestResponse.json();


            const salesResponse =
                await fetch(
                    `${API}/sales/crop/${crop.id}`
                );

            const sales =
                await salesResponse.json();


            totalHarvest +=
                harvests.reduce(
                    (sum, h) =>
                        sum + Number(h.quantity),
                    0
                );


            totalSold +=
                sales.reduce(
                    (sum, s) =>
                        sum + Number(s.quantity),
                    0
                );


            totalRevenue +=
                sales.reduce(
                    (sum, s) =>
                        sum +
                        (
                            Number(s.quantity) *
                            Number(s.price)
                        ),
                    0
                );

        }


        const currentStock =
            totalHarvest - totalSold;


        document.getElementById(
            "totalHarvest"
        ).textContent =
            `${totalHarvest} kg`;


        document.getElementById(
            "totalSold"
        ).textContent =
            `${totalSold} kg`;


        document.getElementById(
            "stockValue"
        ).textContent =
            `${currentStock} kg`;


        document.getElementById(
            "revenueValue"
        ).textContent =
            `₹${totalRevenue.toFixed(2)}`;

    }

    catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


// ==========================================
// MESSAGE
// ==========================================

function showMessage(
    elementId,
    message,
    success
) {

    const element =
        document.getElementById(
            elementId
        );


    element.textContent =
        message;


    element.className =
        success
            ? "message-success"
            : "message-error";

}
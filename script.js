document.addEventListener("DOMContentLoaded", () => {
    const scheduleData = [
        { day: "Senin", subjects: [
            { name: "IPS", teacher: "Eko Suwarmo, S.Pd" },
            { name: "IPA", teacher: "H. Faqih Usman, M.Pd" },
            { name: "Bahasa Inggris", teacher: "Siti SUryani, S.Pd" },
            { name: "Seni Budaya", teacher: "Ida Farida, S.Ag" },
            { name: "Bahasa Arab", teacher: "H. Taufik Husein, SS., M.Pd" }
        ]},
        { day: "Selasa", subjects: [
            { name: "PJOK", teacher: "Rismanto, S.Pd., MA" },
            { name: "Fiqih", teacher: "Ahmad Zakaria, Lc" },
            { name: "PKN", teacher: "Lilik Haryani, S.Pd" },
            { name: "Bahasa Indonesia", teacher: "Nurain, S.Pd" },
            { name: "Bahasa Inggris", teacher: "Siti Suryani, S.Pd" }
        ]},
        { day: "Rabu", subjects: [
            { name: "MTK", teacher: "Lely Farhani, S.Pd" },
            { name: "Bahasa Arab", teacher: "H. Taufik Husein, SS., M.Pd" },
            { name: "Bahasa Indonesia", teacher: "Nurain, S.Pd" },
            { name: "SKI", teacher: "Hj. Emi Karyati, S.Ag" },
            { name: "Qurdist", teacher: "Arini Saila Haq, Lc" }
        ]},
        { day: "Kamis", subjects: [
            { name: "Tahfidz", teacher: "Jiah Ulhak, S.Pd" },
            { name: "IPA", teacher: "H. Faqih Usman, M.Pd" },
            { name: "Aqidah Akhlak", teacher: "Dra. Hj. Nursaena" },
            { name: "IPS", teacher: "Eko Suwarmo, S.Pd" },
            { name: "PJOK", teacher: "Rismanto, S.Pd., MA" }
        ]},
        { day: "Jumat", subjects: [
            { name: "IT", teacher: "Muhammad Farrel Sidqi, S.Pd" },
            { name: "Bahasa Indonesia", teacher: "Nurain, S.Pd" },
            { name: "MTK", teacher: "Lely Farhani, S.Pd" }
        ]}
    ];

    const taskData = [
        {
            subject: "IPS",
            description: "Bukpet hal 38 Tugas Individu 1.3 dan latihan 1.3 di buku tulis",
            dueDate: new Date("2024-09-09"),
        },
        {
            subject: "IPA",
            description: "Kerjakan Lks IPA hal 44 Latihan 1 (no 2 - 5 dibuku tulis)",
            dueDate: new Date("2024-09-09"),
        },
        {
            subject: "Bahasa Inggris",
            description: "Recount Teks",
            dueDate: new Date("2024-09-09"),
        },
        {
            subject: "Seni Budaya",
            description: "Kerjakan Lks hal 14, 20, 24",
            dueDate: new Date("2024-09-09"),
        },
        {
            subject: "Bahasa Indonesia",
            description: "Bikin Teks Prosedur",
            dueDate: new Date("2024-09-10"),
        },
        {
            subject: "MTK",
            description: "Mtk latihan 1 soal limas",
            dueDate: new Date("2024-09-11"),
        },
        {
            subject: "Qurdist",
            description: "Hafalan 2 hadist Qurdist (bagi yang belum)",
            dueDate: new Date("2024-09-11"),
        },
        {
            subject: "Tahfidz",
            description: "Hafalan surah Al Qiyamah",
            dueDate: new Date("2024-09-12"),
        },
    ];

    const examData = [
        {
            subject: "N/A",
            description: "N/A",
            date: new Date("N/A"),
        },
        // Tambahkan detail ulangan lainnya di sini
    ];

    const subjectColors = {
        "": "seagreen",
        "Bahasa Indonesia": "seagreen",
        "PJOK": "seagreen",
        "SBK (Jika Sudah Menggambar)": "seagreen",
        "PKN": "seagreen",
        "IT": "seagreen",
        "SKI": "seagreen",
        "Tahfidz": "seagreen",
        "IPS": "seagreen",
        "Akidah Akhlak": "seagreen",
        // Tambahkan warna untuk mata pelajaran lainnya sesuai kebutuhan
    };

    function updateDateTime() {
        const now = new Date();
        const dateTimeString = now.toLocaleString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short"
        });
        document.getElementById("datetime").innerText = dateTimeString;
        

        // Update location and timezone
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            document.getElementById("location").innerText = `Lokasi: Lat ${latitude.toFixed(2)}, Long ${longitude.toFixed(2)} (WIB)`;
        });
    }

    

    function renderSchedule() {
        const tableBody = document.querySelector("#schedule-table tbody");
        tableBody.innerHTML = ''; // Clear previous content

        scheduleData.forEach((daySchedule) => {
            const dayRow = document.createElement("tr");
            dayRow.innerHTML = `<td colspan="2" class="day-name">${daySchedule.day}</td>`;
            tableBody.appendChild(dayRow);

            daySchedule.subjects.forEach(subject => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="subject-name">${subject.name}<br><span class="teacher-name">${subject.teacher}</span></td>
                `;
                tableBody.appendChild(row);
            });
        });
    }

    function renderExams() {
        const examTableBody = document.querySelector("#exam-table tbody");
        examTableBody.innerHTML = '';
        examData.forEach((exam) => {
            const examRow = document.createElement("tr");

            const dateString = exam.date.toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            // Menentukan warna berdasarkan status
            const statusColor = exam.status === "kelar" ? "green" : "red";

            // Menentukan warna berdasarkan nama pelajaran
            const subjectColor = subjectColors[exam.subject] || "black";

            examRow.innerHTML = `
                <td style="color: ${subjectColor}">${exam.subject}</td>
                <td>${exam.description}</td>
                <td>${dateString}</td>
                <td style="color: ${statusColor}">${exam.status}</td>
            `;
            examTableBody.appendChild(examRow);

            const notificationTime = new Date(exam.date);
            notificationTime.setDate(notificationTime.getDate() - 1);
            notificationTime.setHours(19, 0, 0); // Set waktu ke jam 8 malam sehari sebelumnya
            if (notificationTime > new Date()) {
                scheduleNotification(notificationTime, `Ulangan ${exam.subject}`);
            }
        });
    }

    function renderTasks() {
        const taskSection = document.getElementById("tasks");
        taskSection.innerHTML = '';
        taskData.forEach((task) => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task-item");
    
            const dueDateString = task.dueDate.toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
    
            // Menentukan warna berdasarkan status
            const statusColor = task.status === "kelar" ? "green" : "red";
    
            // Menentukan warna berdasarkan nama pelajaran
            const subjectColor = subjectColors[task.subject] || "black";
    
            taskDiv.innerHTML = `
                <strong style="color: ${subjectColor}">${task.subject}</strong> - ${task.description}<br>
                Tenggat: ${dueDateString}
            `;
            taskSection.appendChild(taskDiv);
    
            const notificationTime = new Date(task.dueDate);
            notificationTime.setDate(notificationTime.getDate() - 1);
            notificationTime.setHours(19, 0, 0); // Set waktu ke jam 8 malam sehari sebelumnya
            if (notificationTime > new Date()) {
                scheduleNotification(notificationTime, task.subject);
            }
        });
    
    }

    function scheduleNotification(time, subject) {
        const now = new Date();
        const delay = time - now;
        if (delay > 0) {
            setTimeout(() => {
                new Notification("Pengingat Tugas", {
                    body: `Jangan lupa mengumpulkan tugas ${subject} besok!`,
                });
            }, delay);
        }
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    renderSchedule();
    renderExams();
    renderTasks();
});

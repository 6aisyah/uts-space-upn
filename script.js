// ==========================================
// SUPABASE
// ==========================================

const SUPABASE_URL =
    "https://gfgwlyzuhfsvralnwiua.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_L1MPzyatQcu_5IaWGXi7Gg_zIBcWsKP";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

    

// ==========================================
// START YOUR JOURNEY
// ==========================================

function showMessage() {

    const journalSection =
        document.getElementById("journal");

    journalSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// JOURNAL
// ==========================================

async function saveJournal() {

    const journal =
        document.querySelector("textarea");

    const savedMessage =
        document.getElementById("savedMessage");

    const text =
        journal.value.trim();


    // Kalau kosong
    if (text === "") {

        savedMessage.innerText =
            "Your thouhts have been save!!";

        return;

    }


    savedMessage.innerText =
        "Saving...";


    // Simpan ke Supabase
    const { error } =
        await supabaseClient
            .from("journal_entries")
            .insert({
                content: text
            });


    // Kalau gagal
    if (error) {

        console.error(
            "Supabase error:",
            JSON.stringify(error, null, 2)
        );

        savedMessage.innerText =
            "Belum tersimpan. Coba lagi ya.";

        return;

    }


    // Kalau berhasil
    journal.value = "";

    savedMessage.innerText =
        "Your thoughts have been saved ♡";


    // Simpan juga di browser
    let journals =
        JSON.parse(
            localStorage.getItem("utsJournals")
        ) || [];


    journals.push({

        text: text,

        date:
            new Date().toLocaleString(
                "id-ID",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )

    });


    localStorage.setItem(
        "utsJournals",
        JSON.stringify(journals)
    );


    // Tampilkan di History
    displayJournals();

}


// ==========================================
// MENAMPILKAN HISTORY
// ==========================================

function displayJournals() {

    const history =
        document.getElementById(
            "journalHistory"
        );


    if (!history) return;


    const journals =
        JSON.parse(
            localStorage.getItem(
                "utsJournals"
            )
        ) || [];


    history.innerHTML = "";


    if (journals.length === 0) {

        history.innerHTML = `
            <p class="empty-journal">
                Your little thoughts will appear here ♡
            </p>
        `;

        return;

    }


    [...journals]
        .reverse()
        .forEach((journal) => {

            const entry =
                document.createElement("div");


            entry.classList.add(
                "journal-entry"
            );


            entry.innerHTML = `
                <small>
                    ${journal.date}
                </small>

                <p>
                    ${escapeHTML(
                        journal.text
                    )}
                </p>
            `;


            history.appendChild(entry);

        });

}


// ==========================================
// MENCEGAH HTML DARI INPUT USER
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ==========================================
// REMINDER
// ==========================================

const notes = [

    "izin hapus uts, soalnya mau fokus makan ayam mas agam aja",

    "rekan-rekan,",

    "sidang hari ini ditunda karena mahasiswanya lagi butuh istirahat.",

    "Kalau udah burnout, gunakan hak untuk tidur yh.",

    "it's okay if today feels a little overwhelming.",

    "you don't have to figure everything out at once",

    "istirahat juga bagian dari proses.",

    "you've made it this far, SSSOOO be proud of yourself.",

    "you're doing better than you think!!!",

    "lu keren banget today, yesterday, dan kapanpun",

    "it's your first UTS, you are allowed to learn as you go.",

    "soalnya susah? ywdh kita adili nanti.",

    "tersangka utama: pembuat soal tidak berperi-kemanusiaan.",

    "pasal yang dilanggar: membuat dosen muda ini stuck di tempat.",

    "oke cukup sekian, sidang dimulai.",

    "ALIAS, SANA BELAJAR.",

    "SMGT"

];


let noteIndex = 0;


function changeNote() {

    const note =
        document.getElementById(
            "notes"
        );


    noteIndex++;


    if (
        noteIndex >= notes.length
    ) {

        noteIndex = 0;

    }


    note.style.opacity = "0";


    setTimeout(() => {

        note.innerText =
            notes[noteIndex];

        note.style.opacity =
            "1";

    }, 200);

}


// ==========================================
// SAAT WEBSITE DIBUKA
// ==========================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        displayJournals();

    }
);
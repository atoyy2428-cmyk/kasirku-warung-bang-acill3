// ==========================================================
// KASIRKU - SISTEM KASIR WARUNG BANG ACILL
// SCRIPT.JS LENGKAP
// ==========================================================


// ==========================================================
// SISTEM AKUN KASIR
// ==========================================================


// ==========================
// AMBIL AKUN AKTIF
// ==========================

function ambilAkunAktifKasir() {

    try {

        return JSON.parse(
            localStorage.getItem("akunAktif")
        );

    } catch (error) {

        return null;

    }

}


// ==========================
// AMBIL ID KASIR AKTIF
// ==========================

function ambilIdKasirAktif() {

    const akun = ambilAkunAktifKasir();

    if (!akun || !akun.id) {
        return null;
    }

    return akun.id;

}


// ==========================
// BUAT KEY DATA PER KASIR
// ==========================

function keyDataKasir(namaData) {

    const idKasir =
        ambilIdKasirAktif();

    if (!idKasir) {
        return null;
    }

    return (
        "kasir_" +
        idKasir +
        "_" +
        namaData
    );

}


// ==========================
// AMBIL DATA KASIR
// ==========================

function ambilDataKasir(namaData) {

    const key =
        keyDataKasir(namaData);

    if (!key) {
        return [];
    }

    try {

        return JSON.parse(
            localStorage.getItem(key)
        ) || [];

    } catch (error) {

        return [];

    }

}


// ==========================
// SIMPAN DATA KASIR
// ==========================

function simpanDataKasir(
    namaData,
    data
) {

    const key =
        keyDataKasir(namaData);

    if (!key) {
        return false;
    }

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

    return true;

}


// ==========================
// HAPUS DATA KASIR
// ==========================

function hapusDataKasir(
    namaData
) {

    const key =
        keyDataKasir(namaData);

    if (!key) {
        return;
    }

    localStorage.removeItem(key);

}


// ==========================
// MIGRASI DATA LAMA
// ==========================

function migrasiDataLamaKasir() {

    const akun =
        ambilAkunAktifKasir();

    if (!akun || !akun.id) {
        return;
    }

    const daftarData = [
        "barang",
        "transaksi",
        "pemasukan",
        "pengeluaran"
    ];

    /*
     * Data lama akan diberikan kepada
     * akun pertama yang melakukan login.
     */

    const pemilikDataLama =
        localStorage.getItem(
            "pemilikDataLamaKasir"
        );

    if (
        pemilikDataLama === null
    ) {

        const adaDataLama =
            daftarData.some(
                function (namaData) {

                    return (
                        localStorage.getItem(
                            namaData
                        ) !== null
                    );

                }
            );

        if (adaDataLama) {

            daftarData.forEach(
                function (namaData) {

                    const dataLama =
                        localStorage.getItem(
                            namaData
                        );

                    const keyBaru =
                        keyDataKasir(
                            namaData
                        );

                    if (
                        dataLama !== null &&
                        keyBaru
                    ) {

                        localStorage.setItem(
                            keyBaru,
                            dataLama
                        );

                    } else if (keyBaru) {

                        localStorage.setItem(
                            keyBaru,
                            JSON.stringify([])
                        );

                    }

                }
            );

            localStorage.setItem(
                "pemilikDataLamaKasir",
                String(akun.id)
            );

        }

    }

}


// ==========================================================
// LOGIN
// ==========================================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;

            const message =
                document.getElementById(
                    "message"
                );


            const akun =
                JSON.parse(
                    localStorage.getItem(
                        "akunKasir"
                    )
                ) || [];


            const akunDitemukan =
                akun.find(
                    function (data) {

                        return (
                            data.username ===
                                username &&
                            data.password ===
                                password
                        );

                    }
                );


            if (akunDitemukan) {

                // Simpan akun aktif
                localStorage.setItem(
                    "akunAktif",
                    JSON.stringify(
                        akunDitemukan
                    )
                );


                // Pindahkan data lama
                // ke akun pertama
                migrasiDataLamaKasir();


                message.textContent =
                    "Login berhasil!";

                message.style.color =
                    "green";


                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    500
                );


            } else {

                message.textContent =
                    "Username atau password salah.";

                message.style.color =
                    "red";

            }

        }
    );

}


// ==========================================================
// BUKA FORM DAFTAR
// ==========================================================

function bukaDaftar() {

    const modal =
        document.getElementById(
            "modalDaftar"
        );

    if (modal) {

        modal.style.display =
            "flex";

    }

}


// ==========================================================
// TUTUP FORM DAFTAR
// ==========================================================

function tutupDaftar() {

    const modal =
        document.getElementById(
            "modalDaftar"
        );

    if (modal) {

        modal.style.display =
            "none";

    }

}


// ==========================================================
// DAFTAR AKUN
// ==========================================================

const daftarForm =
    document.getElementById(
        "daftarForm"
    );


if (daftarForm) {

    daftarForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nama =
                document
                    .getElementById(
                        "namaDaftar"
                    )
                    .value
                    .trim();


            const username =
                document
                    .getElementById(
                        "usernameDaftar"
                    )
                    .value
                    .trim();


            const telepon =
                document
                    .getElementById(
                        "teleponDaftar"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "emailDaftar"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "passwordDaftar"
                    )
                    .value;


            const konfirmasiPassword =
                document
                    .getElementById(
                        "konfirmasiPasswordDaftar"
                    )
                    .value;


            const message =
                document.getElementById(
                    "messageDaftar"
                );


            // ==========================
            // VALIDASI
            // ==========================

            if (
                nama === "" ||
                username === "" ||
                telepon === "" ||
                email === ""
            ) {

                message.textContent =
                    "Semua data harus diisi.";

                message.style.color =
                    "red";

                return;

            }


            if (password.length < 6) {

                message.textContent =
                    "Password minimal 6 karakter.";

                message.style.color =
                    "red";

                return;

            }


            if (
                password !==
                konfirmasiPassword
            ) {

                message.textContent =
                    "Konfirmasi password tidak sama.";

                message.style.color =
                    "red";

                return;

            }


            if (telepon.length < 10) {

                message.textContent =
                    "Nomor HP tidak valid.";

                message.style.color =
                    "red";

                return;

            }


            // ==========================
            // AMBIL DATA AKUN
            // ==========================

            let akun =
                JSON.parse(
                    localStorage.getItem(
                        "akunKasir"
                    )
                ) || [];


            // ==========================
            // CEK USERNAME
            // ==========================

            const usernameSudahAda =
                akun.some(
                    function (data) {

                        return (
                            data.username
                                .toLowerCase() ===
                            username.toLowerCase()
                        );

                    }
                );


            if (usernameSudahAda) {

                message.textContent =
                    "Username sudah digunakan.";

                message.style.color =
                    "red";

                return;

            }


            // ==========================
            // CEK EMAIL
            // ==========================

            const emailSudahAda =
                akun.some(
                    function (data) {

                        return (
                            data.email
                                .toLowerCase() ===
                            email.toLowerCase()
                        );

                    }
                );


            if (emailSudahAda) {

                message.textContent =
                    "Email sudah digunakan.";

                message.style.color =
                    "red";

                return;

            }


            // ==========================
            // BUAT AKUN
            // ==========================

            const akunBaru = {

                id: Date.now(),

                nama: nama,

                username: username,

                telepon: telepon,

                email: email,

                password: password

            };


            akun.push(akunBaru);


            localStorage.setItem(
                "akunKasir",
                JSON.stringify(akun)
            );


            // ==========================
            // BERHASIL
            // ==========================

            message.textContent =
                "Akun berhasil dibuat! Silakan login.";

            message.style.color =
                "green";


            daftarForm.reset();


            setTimeout(
                function () {

                    tutupDaftar();


                    const loginUsername =
                        document.getElementById(
                            "username"
                        );

                    if (loginUsername) {

                        loginUsername.value =
                            username;

                    }


                    const loginPassword =
                        document.getElementById(
                            "password"
                        );

                    if (loginPassword) {

                        loginPassword.value =
                            "";

                    }


                    const loginMessage =
                        document.getElementById(
                            "message"
                        );

                    if (loginMessage) {

                        loginMessage.textContent =
                            "Akun berhasil dibuat. Silakan login.";

                        loginMessage.style.color =
                            "green";

                    }

                },
                800
            );

        }
    );

}


// ==========================================================
// LOGOUT
// ==========================================================

function logout() {

    const yakin =
        confirm(
            "Yakin ingin keluar dari KasirKu?"
        );


    if (yakin) {

        localStorage.removeItem(
            "akunAktif"
        );

        window.location.href =
            "index.html";

    }

}


// ==========================================================
// DATA BARANG
// ==========================================================

function tampilForm() {

    const form =
        document.getElementById(
            "formBarang"
        );

    if (form) {

        form.style.display =
            "block";

    }

}


// ==========================
// SIMPAN BARANG
// ==========================

function simpanBarang() {

    const kode =
        document.getElementById(
            "kode"
        ).value.trim();


    const nama =
        document.getElementById(
            "nama"
        ).value.trim();


    const harga =
        document.getElementById(
            "harga"
        ).value;


    const stok =
        document.getElementById(
            "stok"
        ).value;


    if (
        kode === "" ||
        nama === "" ||
        harga === "" ||
        stok === ""
    ) {

        alert(
            "Semua data harus diisi!"
        );

        return;

    }


    const hargaNumber =
        Number(harga);


    const stokNumber =
        Number(stok);


    if (
        !Number.isFinite(hargaNumber) ||
        !Number.isFinite(stokNumber)
    ) {

        alert(
            "Harga dan stok harus berupa angka!"
        );

        return;

    }


    if (
        hargaNumber < 0 ||
        stokNumber < 0
    ) {

        alert(
            "Harga dan stok tidak boleh negatif!"
        );

        return;

    }


    let barang =
        ambilDataKasir(
            "barang"
        );


    barang.push({

        kode: kode,

        nama: nama,

        harga: hargaNumber,

        stok: stokNumber

    });


    simpanDataKasir(
        "barang",
        barang
    );


    tampilkanDataBarang();


    document.getElementById(
        "kode"
    ).value = "";


    document.getElementById(
        "nama"
    ).value = "";


    document.getElementById(
        "harga"
    ).value = "";


    document.getElementById(
        "stok"
    ).value = "";


    const form =
        document.getElementById(
            "formBarang"
        );

    if (form) {

        form.style.display =
            "none";

    }


    alert(
        "Barang berhasil ditambahkan!"
    );

}


// ==========================
// TAMPILKAN BARANG
// ==========================

function tampilkanDataBarang() {

    const tabel =
        document.getElementById(
            "dataBarang"
        );


    if (!tabel) {
        return;
    }


    const barang =
        ambilDataKasir(
            "barang"
        );


    tabel.innerHTML = "";


    barang.forEach(
        function (item, index) {

            const baris =
                document.createElement(
                    "tr"
                );


            const kodeCell =
                document.createElement(
                    "td"
                );

            kodeCell.textContent =
                item.kode;


            const namaCell =
                document.createElement(
                    "td"
                );

            namaCell.textContent =
                item.nama;


            const hargaCell =
                document.createElement(
                    "td"
                );

            hargaCell.textContent =
                "Rp" +
                Number(
                    item.harga
                ).toLocaleString(
                    "id-ID"
                );


            const stokCell =
                document.createElement(
                    "td"
                );

            stokCell.textContent =
                item.stok;


            const aksiCell =
                document.createElement(
                    "td"
                );


            const tombolEdit =
                document.createElement(
                    "button"
                );

            tombolEdit.textContent =
                "Edit";


            tombolEdit.onclick =
                function () {

                    editBarang(index);

                };


            const tombolHapus =
                document.createElement(
                    "button"
                );

            tombolHapus.textContent =
                "Hapus";


            tombolHapus.onclick =
                function () {

                    hapusBarang(index);

                };


            aksiCell.appendChild(
                tombolEdit
            );

            aksiCell.appendChild(
                tombolHapus
            );


            baris.appendChild(
                kodeCell
            );

            baris.appendChild(
                namaCell
            );

            baris.appendChild(
                hargaCell
            );

            baris.appendChild(
                stokCell
            );

            baris.appendChild(
                aksiCell
            );


            tabel.appendChild(
                baris
            );

        }
    );

}


// ==========================
// HAPUS BARANG
// ==========================

function hapusBarang(index) {

    const yakin =
        confirm(
            "Yakin ingin menghapus barang ini?"
        );


    if (!yakin) {
        return;
    }


    let barang =
        ambilDataKasir(
            "barang"
        );


    barang.splice(
        index,
        1
    );


    simpanDataKasir(
        "barang",
        barang
    );


    tampilkanDataBarang();


    alert(
        "Barang berhasil dihapus!"
    );

}


// ==========================
// EDIT BARANG
// ==========================

function editBarang(index) {

    let barang =
        ambilDataKasir(
            "barang"
        );


    const data =
        barang[index];


    if (!data) {
        return;
    }


    const kodeBaru =
        prompt(
            "Kode Barang:",
            data.kode
        );


    if (kodeBaru === null) {
        return;
    }


    const namaBaru =
        prompt(
            "Nama Barang:",
            data.nama
        );


    if (namaBaru === null) {
        return;
    }


    const hargaBaru =
        prompt(
            "Harga:",
            data.harga
        );


    if (hargaBaru === null) {
        return;
    }


    const stokBaru =
        prompt(
            "Stok:",
            data.stok
        );


    if (stokBaru === null) {
        return;
    }


    if (
        kodeBaru.trim() === "" ||
        namaBaru.trim() === "" ||
        hargaBaru.trim() === "" ||
        stokBaru.trim() === ""
    ) {

        alert(
            "Semua data harus diisi!"
        );

        return;

    }


    const hargaNumber =
        Number(hargaBaru);


    const stokNumber =
        Number(stokBaru);


    if (
        !Number.isFinite(hargaNumber) ||
        !Number.isFinite(stokNumber)
    ) {

        alert(
            "Harga dan stok harus berupa angka!"
        );

        return;

    }


    if (
        hargaNumber < 0 ||
        stokNumber < 0
    ) {

        alert(
            "Harga dan stok tidak boleh negatif!"
        );

        return;

    }


    barang[index] = {

        kode:
            kodeBaru.trim(),

        nama:
            namaBaru.trim(),

        harga:
            hargaNumber,

        stok:
            stokNumber

    };


    simpanDataKasir(
        "barang",
        barang
    );


    tampilkanDataBarang();


    alert(
        "Barang berhasil diubah!"
    );

}


// ==========================================================
// PEMASUKAN
// ==========================================================

function tampilFormPemasukan() {

    const form =
        document.getElementById(
            "formPemasukan"
        );


    if (form) {

        form.style.display =
            "block";

    }

}


// ==========================
// SIMPAN PEMASUKAN
// ==========================

function simpanPemasukan() {

    const tanggal =
        document.getElementById(
            "tanggalPemasukan"
        ).value;


    const keterangan =
        document.getElementById(
            "keteranganPemasukan"
        ).value.trim();


    const jumlah =
        document.getElementById(
            "jumlahPemasukan"
        ).value;


    if (
        tanggal === "" ||
        keterangan === "" ||
        jumlah === ""
    ) {

        alert(
            "Semua data harus diisi!"
        );

        return;

    }


    const jumlahNumber =
        Number(jumlah);


    if (
        !Number.isFinite(jumlahNumber) ||
        jumlahNumber < 0
    ) {

        alert(
            "Jumlah pemasukan tidak valid!"
        );

        return;

    }


    let pemasukan =
        ambilDataKasir(
            "pemasukan"
        );


    pemasukan.push({

        id:
            Date.now(),

        tanggal:
            tanggal,

        keterangan:
            keterangan,

        jumlah:
            jumlahNumber

    });


    simpanDataKasir(
        "pemasukan",
        pemasukan
    );


    tampilkanDataPemasukan();


    const inputTanggal =
        document.getElementById(
            "tanggalPemasukan"
        );

    const inputKeterangan =
        document.getElementById(
            "keteranganPemasukan"
        );

    const inputJumlah =
        document.getElementById(
            "jumlahPemasukan"
        );


    if (inputTanggal) {
        inputTanggal.value = "";
    }

    if (inputKeterangan) {
        inputKeterangan.value = "";
    }

    if (inputJumlah) {
        inputJumlah.value = "";
    }


    const form =
        document.getElementById(
            "formPemasukan"
        );


    if (form) {

        form.style.display =
            "none";

    }


    alert(
        "Pemasukan berhasil ditambahkan!"
    );

}


// ==========================
// TAMPILKAN PEMASUKAN
// ==========================

function tampilkanDataPemasukan() {

    const tabel =
        document.getElementById(
            "dataPemasukan"
        );


    if (!tabel) {
        return;
    }


    const pemasukan =
        ambilDataKasir(
            "pemasukan"
        );


    tabel.innerHTML = "";


    pemasukan.forEach(
        function (item, index) {

            const baris =
                document.createElement(
                    "tr"
                );


            baris.innerHTML = `

                <td>
                    ${item.tanggal}
                </td>

                <td>
                    ${item.keterangan}
                </td>

                <td>
                    Rp${Number(
                        item.jumlah
                    ).toLocaleString("id-ID")}
                </td>

                <td>

                    <button
                        onclick="editPemasukan(${index})"
                    >
                        Edit
                    </button>

                    <button
                        onclick="hapusPemasukan(${index})"
                    >
                        Hapus
                    </button>

                </td>

            `;


            tabel.appendChild(
                baris
            );

        }
    );

}


// ==========================
// HAPUS PEMASUKAN
// ==========================

function hapusPemasukan(index) {

    const yakin =
        confirm(
            "Yakin ingin menghapus pemasukan ini?"
        );


    if (!yakin) {
        return;
    }


    let pemasukan =
        ambilDataKasir(
            "pemasukan"
        );


    pemasukan.splice(
        index,
        1
    );


    simpanDataKasir(
        "pemasukan",
        pemasukan
    );


    tampilkanDataPemasukan();

    tampilkanRingkasan();

}


// ==========================
// EDIT PEMASUKAN
// ==========================

function editPemasukan(index) {

    let pemasukan =
        ambilDataKasir(
            "pemasukan"
        );


    const data =
        pemasukan[index];


    if (!data) {
        return;
    }


    const tanggalBaru =
        prompt(
            "Tanggal:",
            data.tanggal
        );


    if (tanggalBaru === null) {
        return;
    }


    const keteranganBaru =
        prompt(
            "Keterangan:",
            data.keterangan
        );


    if (keteranganBaru === null) {
        return;
    }


    const jumlahBaru =
        prompt(
            "Jumlah:",
            data.jumlah
        );


    if (jumlahBaru === null) {
        return;
    }


    const jumlahNumber =
        Number(jumlahBaru);


    if (
        tanggalBaru.trim() === "" ||
        keteranganBaru.trim() === "" ||
        !Number.isFinite(jumlahNumber) ||
        jumlahNumber < 0
    ) {

        alert(
            "Data pemasukan tidak valid!"
        );

        return;

    }


    pemasukan[index] = {

        id:
            data.id || Date.now(),

        tanggal:
            tanggalBaru.trim(),

        keterangan:
            keteranganBaru.trim(),

        jumlah:
            jumlahNumber

    };


    simpanDataKasir(
        "pemasukan",
        pemasukan
    );


    tampilkanDataPemasukan();

    tampilkanRingkasan();


    alert(
        "Pemasukan berhasil diubah!"
    );

}


// ==========================================================
// PENGELUARAN
// ==========================================================

function tampilFormPengeluaran() {

    const form =
        document.getElementById(
            "formPengeluaran"
        );


    if (form) {

        form.style.display =
            "block";

    }

}


// ==========================
// SIMPAN PENGELUARAN
// ==========================

function simpanPengeluaran() {

    const tanggal =
        document.getElementById(
            "tanggalPengeluaran"
        ).value;


    const keterangan =
        document.getElementById(
            "keteranganPengeluaran"
        ).value.trim();


    const jumlah =
        document.getElementById(
            "jumlahPengeluaran"
        ).value;


    if (
        tanggal === "" ||
        keterangan === "" ||
        jumlah === ""
    ) {

        alert(
            "Semua data harus diisi!"
        );

        return;

    }


    const jumlahNumber =
        Number(jumlah);


    if (
        !Number.isFinite(jumlahNumber) ||
        jumlahNumber < 0
    ) {

        alert(
            "Jumlah pengeluaran tidak valid!"
        );

        return;

    }


    let pengeluaran =
        ambilDataKasir(
            "pengeluaran"
        );


    pengeluaran.push({

        id:
            Date.now(),

        tanggal:
            tanggal,

        keterangan:
            keterangan,

        jumlah:
            jumlahNumber

    });


    simpanDataKasir(
        "pengeluaran",
        pengeluaran
    );


    tampilkanDataPengeluaran();


    const inputTanggal =
        document.getElementById(
            "tanggalPengeluaran"
        );

    const inputKeterangan =
        document.getElementById(
            "keteranganPengeluaran"
        );

    const inputJumlah =
        document.getElementById(
            "jumlahPengeluaran"
        );


    if (inputTanggal) {
        inputTanggal.value = "";
    }

    if (inputKeterangan) {
        inputKeterangan.value = "";
    }

    if (inputJumlah) {
        inputJumlah.value = "";
    }


    const form =
        document.getElementById(
            "formPengeluaran"
        );


    if (form) {

        form.style.display =
            "none";

    }


    alert(
        "Pengeluaran berhasil ditambahkan!"
    );

}


// ==========================
// TAMPILKAN PENGELUARAN
// ==========================

function tampilkanDataPengeluaran() {

    const tabel =
        document.getElementById(
            "dataPengeluaran"
        );


    if (!tabel) {
        return;
    }


    const pengeluaran =
        ambilDataKasir(
            "pengeluaran"
        );


    tabel.innerHTML = "";


    pengeluaran.forEach(
        function (item, index) {

            const baris =
                document.createElement(
                    "tr"
                );


            baris.innerHTML = `

                <td>
                    ${item.tanggal}
                </td>

                <td>
                    ${item.keterangan}
                </td>

                <td>
                    Rp${Number(
                        item.jumlah
                    ).toLocaleString("id-ID")}
                </td>

                <td>

                    <button
                        onclick="editPengeluaran(${index})"
                    >
                        Edit
                    </button>

                    <button
                        onclick="hapusPengeluaran(${index})"
                    >
                        Hapus
                    </button>

                </td>

            `;


            tabel.appendChild(
                baris
            );

        }
    );

}


// ==========================
// HAPUS PENGELUARAN
// ==========================

function hapusPengeluaran(index) {

    const yakin =
        confirm(
            "Yakin ingin menghapus pengeluaran ini?"
        );


    if (!yakin) {
        return;
    }


    let pengeluaran =
        ambilDataKasir(
            "pengeluaran"
        );


    pengeluaran.splice(
        index,
        1
    );


    simpanDataKasir(
        "pengeluaran",
        pengeluaran
    );


    tampilkanDataPengeluaran();

    tampilkanRingkasan();

}


// ==========================
// EDIT PENGELUARAN
// ==========================

function editPengeluaran(index) {

    let pengeluaran =
        ambilDataKasir(
            "pengeluaran"
        );


    const data =
        pengeluaran[index];


    if (!data) {
        return;
    }


    const tanggalBaru =
        prompt(
            "Tanggal:",
            data.tanggal
        );


    if (tanggalBaru === null) {
        return;
    }


    const keteranganBaru =
        prompt(
            "Keterangan:",
            data.keterangan
        );


    if (keteranganBaru === null) {
        return;
    }


    const jumlahBaru =
        prompt(
            "Jumlah:",
            data.jumlah
        );


    if (jumlahBaru === null) {
        return;
    }


    const jumlahNumber =
        Number(jumlahBaru);


    if (
        tanggalBaru.trim() === "" ||
        keteranganBaru.trim() === "" ||
        !Number.isFinite(jumlahNumber) ||
        jumlahNumber < 0
    ) {

        alert(
            "Data pengeluaran tidak valid!"
        );

        return;

    }


    pengeluaran[index] = {

        id:
            data.id || Date.now(),

        tanggal:
            tanggalBaru.trim(),

        keterangan:
            keteranganBaru.trim(),

        jumlah:
            jumlahNumber

    };


    simpanDataKasir(
        "pengeluaran",
        pengeluaran
    );


    tampilkanDataPengeluaran();

    tampilkanRingkasan();


    alert(
        "Pengeluaran berhasil diubah!"
    );

}


// ==========================================================
// DASHBOARD / RINGKASAN
// ==========================================================

function tampilkanRingkasan() {

    const pemasukan =
        ambilDataKasir(
            "pemasukan"
        );


    const pengeluaran =
        ambilDataKasir(
            "pengeluaran"
        );


    const totalPemasukan =
        pemasukan.reduce(
            function (total, item) {

                return (
                    total +
                    Number(
                        item.jumlah || 0
                    )
                );

            },
            0
        );


    const totalPengeluaran =
        pengeluaran.reduce(
            function (total, item) {

                return (
                    total +
                    Number(
                        item.jumlah || 0
                    )
                );

            },
            0
        );


    const saldo =
        totalPemasukan -
        totalPengeluaran;


    const elemenPemasukan =
        document.getElementById(
            "totalPemasukan"
        );


    const elemenPengeluaran =
        document.getElementById(
            "totalPengeluaran"
        );


    const elemenSaldo =
        document.getElementById(
            "saldo"
        );


    if (elemenPemasukan) {

        elemenPemasukan.textContent =
            "Rp" +
            totalPemasukan.toLocaleString(
                "id-ID"
            );

    }


    if (elemenPengeluaran) {

        elemenPengeluaran.textContent =
            "Rp" +
            totalPengeluaran.toLocaleString(
                "id-ID"
            );

    }


    if (elemenSaldo) {

        elemenSaldo.textContent =
            "Rp" +
            saldo.toLocaleString(
                "id-ID"
            );

    }

}


// ==========================================================
// TRANSAKSI
// ==========================================================


// ==========================
// VARIABEL KERANJANG
// ==========================

let keranjang = [];


// ==========================
// TAMPILKAN PILIHAN BARANG
// ==========================

function tampilkanPilihanBarang() {

    const pilihBarang =
        document.getElementById(
            "pilihBarang"
        );


    if (!pilihBarang) {
        return;
    }


    const barang =
        ambilDataKasir(
            "barang"
        );


    pilihBarang.innerHTML =
        "";


    const pilihanAwal =
        document.createElement(
            "option"
        );


    pilihanAwal.value =
        "";


    pilihanAwal.textContent =
        "-- Pilih Barang --";


    pilihBarang.appendChild(
        pilihanAwal
    );


    barang.forEach(
        function (item, index) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                index;


            option.textContent =
                item.nama +
                " - Rp" +
                Number(
                    item.harga
                ).toLocaleString(
                    "id-ID"
                ) +
                " (Stok: " +
                item.stok +
                ")";


            pilihBarang.appendChild(
                option
            );

        }
    );

}


// ==========================
// TAMBAH KE KERANJANG
// ==========================

function tambahKeKeranjang() {

    const pilihBarang =
        document.getElementById(
            "pilihBarang"
        );


    const jumlahInput =
        document.getElementById(
            "jumlahBarang"
        );


    if (
        !pilihBarang ||
        !jumlahInput
    ) {

        return;

    }


    const index =
        pilihBarang.value;


    const jumlah =
        Number(
            jumlahInput.value
        );


    if (index === "") {

        alert(
            "Silakan pilih barang terlebih dahulu!"
        );

        return;

    }


    if (
        !Number.isFinite(jumlah) ||
        jumlah <= 0
    ) {

        alert(
            "Jumlah barang harus lebih dari 0!"
        );

        return;

    }


    const barang =
        ambilDataKasir(
            "barang"
        );


    const item =
        barang[index];


    if (!item) {

        alert(
            "Data barang tidak ditemukan!"
        );

        return;

    }


    if (
        jumlah >
        Number(item.stok)
    ) {

        alert(
            "Stok tidak cukup!\n" +
            "Stok tersedia: " +
            item.stok
        );

        return;

    }


    const barangSudahAda =
        keranjang.findIndex(
            function (data) {

                return (
                    data.indexBarang == index
                );

            }
        );


    if (
        barangSudahAda !== -1
    ) {

        const jumlahBaru =
            keranjang[
                barangSudahAda
            ].jumlah +
            jumlah;


        if (
            jumlahBaru >
            Number(item.stok)
        ) {

            alert(
                "Jumlah melebihi stok yang tersedia!"
            );

            return;

        }


        keranjang[
            barangSudahAda
        ].jumlah =
            jumlahBaru;


    } else {

        keranjang.push({

            indexBarang:
                index,

            nama:
                item.nama,

            harga:
                Number(item.harga),

            jumlah:
                jumlah

        });

    }


    tampilkanKeranjang();


    jumlahInput.value =
        "";


    pilihBarang.value =
        "";

}


// ==========================
// TAMPILKAN KERANJANG
// ==========================

function tampilkanKeranjang() {

    const tabel =
        document.getElementById(
            "dataKeranjang"
        );


    if (!tabel) {
        return;
    }


    tabel.innerHTML =
        "";


    let totalBelanja =
        0;


    keranjang.forEach(
        function (item, index) {

            const totalItem =
                item.harga *
                item.jumlah;


            totalBelanja =
                totalBelanja +
                totalItem;


            const baris =
                document.createElement(
                    "tr"
                );


            const namaCell =
                document.createElement(
                    "td"
                );

            namaCell.textContent =
                item.nama;


            const hargaCell =
                document.createElement(
                    "td"
                );

            hargaCell.textContent =
                "Rp" +
                item.harga.toLocaleString(
                    "id-ID"
                );


            const jumlahCell =
                document.createElement(
                    "td"
                );

            jumlahCell.textContent =
                item.jumlah;


            const totalCell =
                document.createElement(
                    "td"
                );

            totalCell.textContent =
                "Rp" +
                totalItem.toLocaleString(
                    "id-ID"
                );


            const aksiCell =
                document.createElement(
                    "td"
                );


            const tombolHapus =
                document.createElement(
                    "button"
                );


            tombolHapus.textContent =
                "Hapus";


            tombolHapus.onclick =
                function () {

                    hapusDariKeranjang(
                        index
                    );

                };


            aksiCell.appendChild(
                tombolHapus
            );


            baris.appendChild(
                namaCell
            );

            baris.appendChild(
                hargaCell
            );

            baris.appendChild(
                jumlahCell
            );

            baris.appendChild(
                totalCell
            );

            baris.appendChild(
                aksiCell
            );


            tabel.appendChild(
                baris
            );

        }
    );


    const totalElement =
        document.getElementById(
            "totalBelanja"
        );


    if (totalElement) {

        totalElement.textContent =
            "Rp" +
            totalBelanja.toLocaleString(
                "id-ID"
            );

    }

}


// ==========================
// HAPUS DARI KERANJANG
// ==========================

function hapusDariKeranjang(index) {

    keranjang.splice(
        index,
        1
    );


    tampilkanKeranjang();

}


// ==========================
// TAMBAH JUMLAH
// ==========================

function tambahJumlah(index) {

    if (
        !keranjang[index]
    ) {
        return;
    }


    const barang =
        ambilDataKasir(
            "barang"
        );


    const item =
        keranjang[index];


    const dataBarang =
        barang[item.indexBarang];


    if (!dataBarang) {
        return;
    }


    if (
        item.jumlah >=
        Number(dataBarang.stok)
    ) {

        alert(
            "Jumlah sudah mencapai stok yang tersedia."
        );

        return;

    }


    item.jumlah++;


    tampilkanKeranjang();

}


// ==========================
// KURANGI JUMLAH
// ==========================

function kurangiJumlah(index) {

    if (
        !keranjang[index]
    ) {
        return;
    }


    keranjang[index].jumlah--;


    if (
        keranjang[index].jumlah <= 0
    ) {

        keranjang.splice(
            index,
            1
        );

    }


    tampilkanKeranjang();

}


// ==========================
// AMBIL TOTAL BELANJA
// ==========================

function ambilTotalBelanja() {

    return keranjang.reduce(
        function (total, item) {

            return (
                total +
                (
                    Number(item.harga) *
                    Number(item.jumlah)
                )
            );

        },
        0
    );

}


// ==========================
// HITUNG KEMBALIAN
// ==========================

function hitungKembalian() {

    const total =
        ambilTotalBelanja();


    const uangBayarElement =
        document.getElementById(
            "uangBayar"
        );


    const kembalianElement =
        document.getElementById(
            "kembalian"
        );


    if (
        !uangBayarElement ||
        !kembalianElement
    ) {

        return;

    }


    const uangBayar =
        Number(
            uangBayarElement.value
        );


    if (
        !Number.isFinite(uangBayar)
    ) {

        kembalianElement.textContent =
            "Rp0";

        return;

    }


    const kembalian =
        uangBayar -
        total;


    if (kembalian < 0) {

        kembalianElement.textContent =
            "Uang kurang Rp" +
            Math.abs(
                kembalian
            ).toLocaleString(
                "id-ID"
            );

    } else {

        kembalianElement.textContent =
            "Rp" +
            kembalian.toLocaleString(
                "id-ID"
            );

    }

}


// ==========================
// SELESAIKAN TRANSAKSI
// ==========================

function selesaikanTransaksi() {

    if (
        keranjang.length === 0
    ) {

        alert(
            "Keranjang masih kosong!"
        );

        return;

    }


    const total =
        ambilTotalBelanja();


    const uangBayarElement =
        document.getElementById(
            "uangBayar"
        );


    if (!uangBayarElement) {

        alert(
            "Input pembayaran tidak ditemukan."
        );

        return;

    }


    const uangBayar =
        Number(
            uangBayarElement.value
        );


    if (
        !Number.isFinite(uangBayar) ||
        uangBayar <= 0
    ) {

        alert(
            "Masukkan jumlah uang pembayaran."
        );

        return;

    }


    if (
        uangBayar < total
    ) {

        alert(
            "Uang pembayaran kurang Rp" +
            (
                total - uangBayar
            ).toLocaleString(
                "id-ID"
            )
        );

        return;

    }


    const kembalian =
        uangBayar -
        total;


    let barang =
        ambilDataKasir(
            "barang"
        );


    // ==========================
    // CEK STOK SEKALI LAGI
    // ==========================

    for (
        let i = 0;
        i < keranjang.length;
        i++
    ) {

        const item =
            keranjang[i];


        const dataBarang =
            barang[
                item.indexBarang
            ];


        if (!dataBarang) {

            alert(
                "Barang " +
                item.nama +
                " tidak ditemukan."
            );

            return;

        }


        if (
            Number(item.jumlah) >
            Number(dataBarang.stok)
        ) {

            alert(
                "Stok barang " +
                item.nama +
                " tidak mencukupi."
            );

            return;

        }

    }


    // ==========================
    // KURANGI STOK
    // ==========================

    keranjang.forEach(
        function (item) {

            barang[
                item.indexBarang
            ].stok -=
                Number(
                    item.jumlah
                );

        }
    );


    simpanDataKasir(
        "barang",
        barang
    );


    // ==========================
    // BUAT DATA TRANSAKSI
    // ==========================

    const dataTransaksi = {

        id:
            Date.now(),

        tanggal:
            new Date().toLocaleString(
                "id-ID"
            ),

        items:
            JSON.parse(
                JSON.stringify(
                    keranjang
                )
            ),

        total:
            total,

        bayar:
            uangBayar,

        kembalian:
            kembalian

    };


    // ==========================
    // SIMPAN TRANSAKSI
    // ==========================

    let transaksi =
        ambilDataKasir(
            "transaksi"
        );


    transaksi.push(
        dataTransaksi
    );


    simpanDataKasir(
        "transaksi",
        transaksi
    );


    // ==========================
    // SIMPAN STRUK TERAKHIR
    // ==========================

    localStorage.setItem(
        "strukTerakhir",
        JSON.stringify(
            dataTransaksi
        )
    );


    // ==========================
    // KOSONGKAN KERANJANG
    // ==========================

    keranjang = [];


    // ==========================
    // PINDAH KE STRUK
    // ==========================

    window.location.href =
        "struk.html";

}


// ==========================================================
// JALANKAN FUNGSI SAAT HALAMAN DIBUKA
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tampilkanDataBarang();

        tampilkanDataPemasukan();

        tampilkanDataPengeluaran();

        tampilkanRingkasan();

        tampilkanPilihanBarang();

        tampilkanKeranjang();

    }
);
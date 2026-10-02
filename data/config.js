// Top-level `const` does not create a window property; main.js reads window.CONFIG.
window.CONFIG = {
  couple: {
    groom: {
      name: "Fakari",
      fullName: "Fakari, S.Kom.",
      photo: "assets/img/groom.jpg",
      parents: {
        father: "Bpk. H. Ahmad",
        mother: "Ibu Hj. Siti Maryam"
      },
      instagram: "https://instagram.com/fakari"
    },
    bride: {
      name: "Aghita",
      fullName: "Aghita, S.Tr.Kom.",
      photo: "assets/img/bride.jpg",
      parents: {
        father: "Bpk. H. Sulaiman",
        mother: "Ibu Hj. Nurhayati"
      },
      instagram: "https://instagram.com/aghita"
    }
  },

  events: {
    akad: {
      date: "2026-12-12",
      timeStart: "08:00",
      timeEnd: "10:00",
      venue: "Masjid Raya Al-Muhajirin",
      address: "Jl. Diponegoro No. 45, Jakarta Selatan",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTEnNDEuMSJTIDEwNsKwNDknMTAuNCJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid",
      mapsLink: "https://maps.google.com/?q=-6.194741,106.8195613"
    },
    resepsi: {
      date: "2026-12-12",
      timeStart: "11:00",
      timeEnd: "15:00",
      venue: "Grand Ballroom Hotel Horison",
      address: "Jl. Gatot Subroto No. 136, Jakarta Selatan",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTEnNDEuMSJTIDEwNsKwNDknMTAuNCJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid",
      mapsLink: "https://maps.google.com/?q=-6.194741,106.8195613"
    }
  },

  gallery: [
    "assets/img/gallery/photo1.jpg",
    "assets/img/gallery/photo2.jpg",
    "assets/img/gallery/photo3.jpg",
    "assets/img/gallery/photo4.jpg",
    "assets/img/gallery/photo5.jpg",
    "assets/img/gallery/photo6.jpg"
  ],

  bank: {
    name: "Bank Central Asia (BCA)",
    accountNumber: "8295123456",
    accountHolder: "Fakari"
  },

  googleAppsScript: {
    rsvpUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
    guestbookUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
  },

  music: {
    src: "assets/music/bg-music.mp3",
    autoplay: false
  },

  text: {
    id: {
      cover: {
        greeting: "The Wedding of",
        names: "Fakari & Aghita",
        date: "12 Desember 2026",
        openBtn: "Buka Undangan",
        to: "Kepada Yth. Bapak/Ibu/Saudara/i:"
      },
      couple: {
        title: "Mempelai",
        groomTitle: "Mempelai Pria",
        brideTitle: "Mempelai Wanita",
        sonOf: "Putra tercinta dari",
        daughterOf: "Putri tercinta dari"
      },
      events: {
        title: "Waktu & Tempat",
        akad: "Akad Nikah",
        resepsi: "Resepsi Pernikahan",
        mapsBtn: "Petunjuk Arah",
        calendarBtn: "Simpan ke Kalender"
      },
      countdown: {
        title: "Menghitung Hari",
        days: "Hari",
        hours: "Jam",
        minutes: "Menit",
        seconds: "Detik"
      },
      gallery: {
        title: "Momen Bahagia"
      },
      rsvp: {
        title: "Konfirmasi Kehadiran",
        name: "Nama Lengkap",
        namePlaceholder: "Masukkan nama Anda",
        attendance: "Kehadiran",
        attend: "Hadir",
        notAttend: "Berhalangan Hadir",
        guests: "Jumlah Tamu",
        guestsPlaceholder: "Jumlah tamu yang hadir",
        message: "Ucapan & Doa",
        messagePlaceholder: "Tuliskan doa restu dan ucapan hangat Anda...",
        submit: "Kirim Konfirmasi",
        success: "Terima kasih atas doa dan konfirmasi Anda!",
        error: "Terjadi kendala saat mengirim. Silakan coba lagi."
      },
      guestbook: {
        title: "Untaian Doa & Ucapan",
        empty: "Belum ada ucapan. Jadilah yang pertama memberikan doa!",
        loading: "Memuat ucapan..."
      },
      envelope: {
        title: "Amplop Digital",
        subtitle: "Doa restu Anda merupakan karunia yang paling berharga bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat menyalurkannya melalui:",
        copyBtn: "Salin No. Rekening",
        copied: "Nomor Rekening Tersalin!"
      },
      footer: {
        quote: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
        source: "QS. Ar-Rum: 21",
        thankYou: "Merupakan suatu kehormatan & kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
        credit: "Fakari & Aghita Wedding"
      }
    },
    en: {
      cover: {
        greeting: "The Wedding of",
        names: "Fakari & Aghita",
        date: "December 12, 2026",
        openBtn: "Open Invitation",
        to: "Dear Honorable Guest:"
      },
      couple: {
        title: "The Happy Couple",
        groomTitle: "The Groom",
        brideTitle: "The Bride",
        sonOf: "Beloved son of",
        daughterOf: "Beloved daughter of"
      },
      events: {
        title: "Events & Venue",
        akad: "Holy Matrimony",
        resepsi: "Wedding Reception",
        mapsBtn: "Get Directions",
        calendarBtn: "Save to Calendar"
      },
      countdown: {
        title: "Counting Down",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds"
      },
      gallery: {
        title: "Moments of Love"
      },
      rsvp: {
        title: "RSVP Confirmation",
        name: "Full Name",
        namePlaceholder: "Enter your full name",
        attendance: "Will you attend?",
        attend: "Joyfully Accept",
        notAttend: "Regretfully Decline",
        guests: "Number of Guests",
        guestsPlaceholder: "Number of attending guests",
        message: "Wishes & Prayers",
        messagePlaceholder: "Send your warm wishes and prayers...",
        submit: "Send RSVP",
        success: "Thank you for confirming your attendance!",
        error: "Failed to submit. Please try again."
      },
      guestbook: {
        title: "Wishes & Prayers",
        empty: "No messages yet. Be the first to send wishes!",
        loading: "Loading messages..."
      },
      envelope: {
        title: "Wedding Gift",
        subtitle: "Your presence and prayers are the greatest gift. However, if you wish to honor us with a gift, you may send it through:",
        copyBtn: "Copy Account Number",
        copied: "Account Number Copied!"
      },
      footer: {
        quote: "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.",
        source: "QS. Ar-Rum: 21",
        thankYou: "It would be an honor and joy for us to have your presence and blessings.",
        credit: "Fakari & Aghita Wedding"
      }
    }
  },

  theme: {
    colors: {
      primary: "#6B7F5E",
      secondary: "#B8A88A",
      accent: "#C9A86C",
      background: "#FDF8F3",
      text: "#3D3D3D",
      textLight: "#6B6B6B"
    },
    fonts: {
      heading: "'Cormorant Garamond', serif",
      body: "'Lato', sans-serif"
    }
  }
};

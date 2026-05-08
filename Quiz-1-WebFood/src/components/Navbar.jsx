function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Foodly</h1>
        <span>Food by Rafly</span>
      </div>

      <ul>
        <li>Beranda</li>
        <li>Menu</li>
        <li>Tentang</li>
        <li>Testimoni</li>
      </ul>

      <button className="nav-btn">
        Pesan Sekarang
      </button>
    </nav>
  );
}

export default Navbar;
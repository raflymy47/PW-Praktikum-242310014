function MenuSection() {
  return (
    <section className="menu">
      <h2>Menu Favorit Kami</h2>

      <div className="menu-container">

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
            alt=""
          />
          <h3>Burger Special</h3>
          <p>Rp 28.000</p>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            alt=""
          />
          <h3>Healthy Bowl</h3>
          <p>Rp 25.000</p>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
            alt=""
          />
          <h3>Pizza Italian</h3>
          <p>Rp 35.000</p>
        </div>

      </div>
    </section>
  );
}

export default MenuSection;
import { NavLink } from "react-router-dom";


import work1 from "../../images/home/work1.png";
import work2 from "../../images/home/work2.png";
import work3 from "../../images/home/work3.png";
import work4 from "../../images/home/work4.png";
import work5 from "../../images/home/work5.png";
import work6 from "../../images/home/work6.png";
import work7 from "../../images/home/work7.png";
import work8 from "../../images/home/work8.png";

export default function Work() {
  return (
    <section className="work-section">
      <div className="work-wrapper">
        <div className="work-grid">
          <img src={work1} className="img img1" alt="" />
          <img src={work2} className="img img2" alt="" />
          <img src={work3} className="img img3" alt="" />
          <img src={work4} className="img img4" alt="" />
          <img src={work5} className="img img5" alt="" />
          <img src={work6} className="img img6" alt="" />
          <img src={work7} className="img img7" alt="" />
          <img src={work8} className="img img8" alt="" />
        </div>

        <NavLink to="/work">
          <button className="our-work-btn">OUR WORK</button>
        </NavLink>
      </div>
    </section>
  );
}

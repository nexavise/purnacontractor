import service1 from "../../images/services/service1-1.jpg";
import service2 from "../../images/services/service2-1.jpg";
import service3 from "../../images/services/service3-1.jpg";
import service4 from "../../images/services/service4-1.jpg";
import service5 from "../../images/services/service5-1.jpg";
import service6 from "../../images/services/service6-1.jpg";
import { useEffect, useRef } from "react";

const ExIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      transform="scale(0.1095)" // 48 / 438.474
      fill="black"
      stroke="none"
    >
      <path
        d="M429.929,159.236l-49.827-37.155c-1.905-2.289-4.326-4.102-7.076-5.273L221.36,3.725
      c-2.972-2.49-7.315-2.49-10.287,0L7.893,159.753c-6.833,5.582-7.842,15.67-2.252,22.498
      c3.585,4.396,8.895,6.918,14.577,6.918c4.329,0,8.552-1.512,11.9-4.247l18.691-15.273v165.694
      c0,10.374,8.441,18.814,18.813,18.814s18.814-8.44,18.814-18.814V137.761L210.318,29.017
      l136.19,101.542v204.783c0,10.374,8.442,18.814,18.814,18.814
      c10.377,0,18.814-8.44,18.814-18.814V172.25l23.007,17.152
      c3.276,2.441,7.161,3.727,11.234,3.727
      c5.926,0,11.559-2.834,15.093-7.57
      C439.972,177.249,438.25,165.438,429.929,159.236z"
      />
    </g>
  </svg>
);

const HomeIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_217_457)">
      <path
        d="M30 42V26C30 25.4696 29.7893 24.9609 29.4142 24.5858C29.0391 24.2107 28.5304 24 28 24H20C19.4696 24 18.9609 24.2107 18.5858 24.5858C18.2107 24.9609 18 25.4696 18 26V42"
        stroke="black"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 19.9999C5.99986 19.4181 6.12667 18.8432 6.37158 18.3154C6.61648 17.7876 6.9736 17.3195 7.418 16.9439L21.418 4.94594C22.14 4.33575 23.0547 4.00098 24 4.00098C24.9453 4.00098 25.86 4.33575 26.582 4.94594L40.582 16.9439C41.0264 17.3195 41.3835 17.7876 41.6284 18.3154C41.8733 18.8432 42.0001 19.4181 42 19.9999V37.9999C42 39.0608 41.5786 40.0782 40.8284 40.8284C40.0783 41.5785 39.0609 41.9999 38 41.9999H10C8.93913 41.9999 7.92172 41.5785 7.17157 40.8284C6.42143 40.0782 6 39.0608 6 37.9999V19.9999Z"
        stroke="black"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M30 46V30C30 29.4696 29.7893 28.9609 29.4142 28.5858C29.0391 28.2107 28.5304 28 28 28H20C19.4696 28 18.9609 28.2107 18.5858 28.5858C18.2107 28.9609 18 29.4696 18 30V46"
        stroke="black"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 23.9999C5.99986 23.4181 6.12667 22.8432 6.37158 22.3154C6.61648 21.7876 6.9736 21.3195 7.418 20.9439L21.418 8.94594C22.14 8.33575 23.0547 8.00098 24 8.00098C24.9453 8.00098 25.86 8.33575 26.582 8.94594L40.582 20.9439C41.0264 21.3195 41.3835 21.7876 41.6284 22.3154C41.8733 22.8432 42.0001 23.4181 42 23.9999V41.9999C42 43.0608 41.5786 44.0782 40.8284 44.8284C40.0783 45.5785 39.0609 45.9999 38 45.9999H10C8.93913 45.9999 7.92172 45.5785 7.17157 44.8284C6.42143 44.0782 6 43.0608 6 41.9999V23.9999Z"
        stroke="black"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_217_457">
        <rect width="48" height="48" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CommercialIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 44V8C12 6.93913 12.4214 5.92172 13.1716 5.17157C13.9217 4.42143 14.9391 4 16 4H32C33.0609 4 34.0783 4.42143 34.8284 5.17157C35.5786 5.92172 36 6.93913 36 8V44H12Z"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 24H8C6.93913 24 5.92172 24.4214 5.17157 25.1716C4.42143 25.9217 4 26.9391 4 28V40C4 41.0609 4.42143 42.0783 5.17157 42.8284C5.92172 43.5786 6.93913 44 8 44H12"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M36 18H40C41.0609 18 42.0783 18.4214 42.8284 19.1716C43.5786 19.9217 44 20.9391 44 22V40C44 41.0609 43.5786 42.0783 42.8284 42.8284C42.0783 43.5786 41.0609 44 40 44H36"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 12H28"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 20H28"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 28H28"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 36H28"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CabinetIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.2448 35.7938L7.88477 29.9678"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M36.7528 5.24347C37.147 4.84924 37.615 4.53652 38.1301 4.32317C38.6452 4.10981 39.1973 4 39.7548 4C40.3123 4 40.8644 4.10981 41.3795 4.32317C41.8946 4.53652 42.3626 4.84924 42.7568 5.24347C43.151 5.6377 43.4638 6.10571 43.6771 6.6208C43.8905 7.13588 44.0003 7.68795 44.0003 8.24547C44.0003 8.80299 43.8905 9.35506 43.6771 9.87014C43.4638 10.3852 43.151 10.8532 42.7568 11.2475L34.7208 19.2855C34.5333 19.473 34.428 19.7273 34.428 19.9925C34.428 20.2576 34.5333 20.5119 34.7208 20.6995L36.6088 22.5875C37.5126 23.4914 38.0203 24.7173 38.0203 25.9955C38.0203 27.2737 37.5126 28.4996 36.6088 29.4035L34.7208 31.2915C34.5333 31.4789 34.279 31.5843 34.0138 31.5843C33.7486 31.5843 33.4943 31.4789 33.3068 31.2915L16.7088 14.6955C16.5213 14.5079 16.416 14.2536 16.416 13.9885C16.416 13.7233 16.5213 13.469 16.7088 13.2815L18.5968 11.3935C19.5007 10.4897 20.7266 9.98198 22.0048 9.98198C23.283 9.98198 24.5089 10.4897 25.4128 11.3935L27.3008 13.2815C27.4883 13.4689 27.7426 13.5743 28.0078 13.5743C28.273 13.5743 28.5273 13.4689 28.7148 13.2815L36.7528 5.24347Z"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.9998 16C14.3918 21.42 10.0598 22.92 4.83384 23.896C4.66048 23.9277 4.49835 24.0039 4.36345 24.1173C4.22856 24.2307 4.12554 24.3773 4.06457 24.5427C4.0036 24.708 3.98678 24.8864 4.01576 25.0603C4.04474 25.2341 4.11853 25.3974 4.22984 25.534L18.8698 43.3C19.1672 43.6158 19.5592 43.8264 19.9867 43.9C20.4142 43.9736 20.854 43.9062 21.2398 43.708C25.4698 40.81 31.9998 33.584 31.9998 30"
      stroke="black"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const WoodIcon = () => (
  <svg
    version="1.1"
    id="Uploaded to svgrepo.com"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="48px"
    height="48px"
    viewBox="0 0 32 32"
    xml:space="preserve"
  >
    <style type="text/css"></style>
    <g>
      <g>
        <path
          class="open_een"
          d="M23.5,12c0.276,0,0.5-0.224,0.5-0.5v-8C24,2.673,23.327,2,22.5,2h-13C8.673,2,8,2.673,8,3.5v5
			C8,8.776,8.224,9,8.5,9S9,8.776,9,8.5v-5C9,3.224,9.224,3,9.5,3h13C22.776,3,23,3.224,23,3.5V11H8.5C8.224,11,8,11.224,8,11.5v17
			C8,29.327,8.673,30,9.5,30h13c0.827,0,1.5-0.673,1.5-1.5v-14c0-0.276-0.224-0.5-0.5-0.5h-3c-0.276,0-0.5,0.224-0.5,0.5v10.744
			c0,0.152-0.068,0.294-0.187,0.39c-0.119,0.095-0.274,0.132-0.354,0.119l-3.286-1.221c-0.112-0.042-0.236-0.042-0.349,0
			l-3.218,1.202c-0.152,0.031-0.303-0.004-0.421-0.099C12.068,25.539,12,25.396,12,25.244V14.5c0-0.276-0.224-0.5-0.5-0.5
			S11,14.224,11,14.5v10.744c0,0.457,0.204,0.883,0.56,1.169c0.356,0.286,0.815,0.395,1.329,0.277L16,25.533l3.178,1.176
			c0.445,0.1,0.906-0.009,1.262-0.296c0.355-0.286,0.56-0.712,0.56-1.169V15h2v13.5c0,0.276-0.224,0.5-0.5,0.5h-13
			C9.224,29,9,28.776,9,28.5V12h6.5v4.406l-0.995,2.548c-0.18,0.462-0.121,0.982,0.158,1.392c0.28,0.41,0.743,0.654,1.239,0.654
			h0.195c0.496,0,0.959-0.245,1.239-0.654c0.279-0.41,0.338-0.93,0.158-1.391L16.5,16.406V12H23.5z M16.51,19.782
			C16.416,19.92,16.265,20,16.098,20h-0.195c-0.167,0-0.318-0.08-0.413-0.218c-0.095-0.138-0.114-0.307-0.053-0.464L16,17.875
			l0.563,1.443C16.624,19.475,16.605,19.644,16.51,19.782z"
        />
      </g>
      <g>
        <path
          class="open_een"
          d="M23.5,12c0.276,0,0.5-0.224,0.5-0.5v-8C24,2.673,23.327,2,22.5,2h-13C8.673,2,8,2.673,8,3.5v5
			C8,8.776,8.224,9,8.5,9S9,8.776,9,8.5v-5C9,3.224,9.224,3,9.5,3h13C22.776,3,23,3.224,23,3.5V11H8.5C8.224,11,8,11.224,8,11.5v17
			C8,29.327,8.673,30,9.5,30h13c0.827,0,1.5-0.673,1.5-1.5v-14c0-0.276-0.224-0.5-0.5-0.5h-3c-0.276,0-0.5,0.224-0.5,0.5v10.744
			c0,0.152-0.068,0.294-0.187,0.39c-0.119,0.095-0.274,0.132-0.354,0.119l-3.286-1.221c-0.112-0.042-0.236-0.042-0.349,0
			l-3.218,1.202c-0.152,0.031-0.303-0.004-0.421-0.099C12.068,25.539,12,25.396,12,25.244V14.5c0-0.276-0.224-0.5-0.5-0.5
			S11,14.224,11,14.5v10.744c0,0.457,0.204,0.883,0.56,1.169c0.356,0.286,0.815,0.395,1.329,0.277L16,25.533l3.178,1.176
			c0.445,0.1,0.906-0.009,1.262-0.296c0.355-0.286,0.56-0.712,0.56-1.169V15h2v13.5c0,0.276-0.224,0.5-0.5,0.5h-13
			C9.224,29,9,28.776,9,28.5V12h6.5v4.406l-0.995,2.548c-0.18,0.462-0.121,0.982,0.158,1.392c0.28,0.41,0.743,0.654,1.239,0.654
			h0.195c0.496,0,0.959-0.245,1.239-0.654c0.279-0.41,0.338-0.93,0.158-1.391L16.5,16.406V12H23.5z M16.51,19.782
			C16.416,19.92,16.265,20,16.098,20h-0.195c-0.167,0-0.318-0.08-0.413-0.218c-0.095-0.138-0.114-0.307-0.053-0.464L16,17.875
			l0.563,1.443C16.624,19.475,16.605,19.644,16.51,19.782z"
        />
      </g>
    </g>
  </svg>
);

const services = [
  {
    title: "Exterior Painting",
    image: service1,
    icon: <ExIcon />,
    points: [
      "Color Consultation",
      "Wall Preparation",
      "Premium Paints",
      "Furniture Protection",
    ],
  },
  {
    title: "Interior Painting",
    image: service2,
    icon: <HomeIcon />,
    points: [
      "Pressure Washing",
      "Surface Repair",
      "Weather-Resistant Paints",
      "Multi-Story Capability",
    ],
  },
  {
    title: "Commercial Painting",
    image: service3,
    icon: <CommercialIcon />,
    points: [
      "Minimal Disruption",
      "After-Hours Work",
      "Large-Scale Projects",
      "Quick Turnaround",
    ],
  },
  {
    title: "Cabinet Refinishing",
    image: service4,
    icon: <CabinetIcon />,
    points: [
      "Surface Preparation",
      "Spray Finish Option",
      "Hardware Reinstallation",
      "Durable Coatings",
    ],
  },
  {
    title: "Wood Polishing",
    image: service5,
    icon: <WoodIcon />,
    points: [
      "Surface Preparation",
      "Spray Finish Option",
      "Hardware Reinstallation",
      "Durable Coatings",
    ],
  },
  {
    title: "Designer Finishing",
    image: service6,
    icon: <CabinetIcon />,
    points: [
      "Surface Preparation",
      "Spray Finish Option",
      "Hardware Reinstallation",
      "Durable Coatings",
    ],
  },
];

export default function ServiceList() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.25 },
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services-list">
      {services.map((service, i) => (
        <div
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          className={`service-card-row ${i % 2 !== 0 ? "reverse" : ""}`}
        >
          <img src={service.image} alt={service.title} />

          <div className="service-s-content">
            <div className="service-left">
              {service.icon}
              <h3>{service.title}</h3>
            </div>

            <div className="service-right">
              <ul>
                {service.points.map((p, idx) => (
                  <li key={idx}>
                    <div className="service-point">
                      <svg width="20" height="20" viewBox="0 0 20 20">
                        <path
                          d="M9.99935 18.3333C11.5464 18.3333 13.0302 17.7188 14.1241 16.6248C15.2181 15.5308 15.8327 14.0471 15.8327 12.5C15.8327 10.8333 14.9993 9.25 13.3327 7.91667C11.666 6.58333 10.416 4.58333 9.99935 2.5C9.58268 4.58333 8.33268 6.58333 6.66602 7.91667C4.99935 9.25 4.16602 10.8333 4.16602 12.5C4.16602 14.0471 4.7806 15.5308 5.87456 16.6248C6.96852 17.7188 8.45225 18.3333 9.99935 18.3333Z"
                          stroke="black"
                          strokeWidth="1.6667"
                          fill="none"
                        />
                      </svg>
                      {p}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

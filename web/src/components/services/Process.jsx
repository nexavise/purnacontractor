/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

/* ================= ANIMATION VARIANTS ================= */
const fade = ({
  direction = "up", // "up" | "down" | "left" | "right"
  distance = 40,
  duration = 0.7,
  delay = 0,
} = {}) => {
  const axis = direction === "up" || direction === "down" ? "y" : "x";

  const value =
    direction === "up" || direction === "left" ? distance : -distance;

  return {
    hidden: {
      opacity: 0,
      [axis]: value,
    },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };
};

const formStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

export default function Process() {
  return (
    <section className="process-section">
      <div>
        <motion.h2
          className="process-title"
          variants={fade({ direction: "up", duration: 0.8 })}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Our Process
        </motion.h2>

        <div className="process-wrapper">
          <svg
            className="process-line"
            viewBox="0 0 798 266"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.81445 2.81445C134.814 2.81445 134.814 262.814 266.814 262.814C398.814 262.814 398.814 2.81445 530.814 2.81445C662.814 2.81445 662.814 262.814 794.814 262.814"
              stroke="#FDC700"
              strokeWidth="5.6"
              strokeLinecap="round"
            />
          </svg>

<div className="process-steps">
          {/* STEP 01 */}
          <motion.div
            className="step p-step-1"
            variants={fade({ direction: "up", duration: 0.8 })}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="circle">01</div>
            <div className="step-content">
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.32226 20.1223C2.51831 20.6168 2.56196 21.1587 2.44759 21.6783L1.02759 26.0649C0.981834 26.2874 0.993664 26.5178 1.06196 26.7345C1.13025 26.9511 1.25274 27.1466 1.41781 27.3026C1.58288 27.4586 1.78507 27.5699 2.00519 27.6258C2.22531 27.6817 2.45607 27.6805 2.67559 27.6223L7.22625 26.2916C7.71654 26.1943 8.22429 26.2368 8.69159 26.4143C11.5388 27.7439 14.7641 28.0252 17.7985 27.2086C20.8328 26.3919 23.4813 24.5298 25.2765 21.9508C27.0718 19.3717 27.8984 16.2415 27.6107 13.1123C27.3229 9.98318 25.9392 7.05622 23.7037 4.84785C21.4682 2.63949 18.5245 1.29164 15.3921 1.04212C12.2597 0.792598 9.13977 1.65743 6.58284 3.48404C4.02592 5.31065 2.1963 7.98165 1.41678 11.0258C0.637262 14.0699 0.957947 17.2915 2.32226 20.1223Z"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h3 className="p-h3">Consultation</h3>
              <p>
                Articulating your vision and defining parameters for excellence.
              </p>
            </div>
          </motion.div>

          {/* STEP 02 */}
          <motion.div
            className="step p-step-2"
            variants={fade({ direction: "down", duration: 0.8, delay: 0.25 })}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="step-content">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0007 16L7.50339 28.4973C7.24075 28.7601 6.92893 28.9685 6.58573 29.1107C6.24254 29.2529 5.87469 29.3262 5.5032 29.3262C4.75293 29.3264 4.03334 29.0284 3.50273 28.498C2.97212 27.9676 2.67395 27.2481 2.67383 26.4978C2.6737 25.7475 2.97163 25.0279 3.50206 24.4973L16.0007 12"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M24 20.0003L29.3333 14.667"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28.6667 15.3333L26.1147 12.7813C25.6145 12.2814 25.3335 11.6032 25.3333 10.896V10.4373C25.3332 9.73015 25.0521 9.05198 24.552 8.552L22.3427 6.34267C20.8428 4.84309 18.8089 4.00045 16.688 4H12L13.6573 5.65733C15.1572 7.15749 15.9999 9.19197 16 11.3133V13.3333L18.6667 16H20.2293C20.9365 16.0002 21.6147 16.2812 22.1147 16.7813L24.6667 19.3333"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h3 className="p-h3">Preparation</h3>
              <p>Meticulous base refinement and structural optimization.</p>
            </div>
            <div className="circle">02</div>
          </motion.div>

          {/* STEP 03 */}
          <motion.div
            className="step p-step-3"
            variants={fade({ direction: "up", duration: 0.8, delay: 0.5 })}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="circle">03</div>
            <div className="step-content">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6899 3.75161C14.7471 3.44575 14.9094 3.1695 15.1487 2.9707C15.3881 2.77191 15.6894 2.66309 16.0006 2.66309C16.3117 2.66309 16.6131 2.77191 16.8525 2.9707C17.0918 3.1695 17.2541 3.44575 17.3113 3.75161L18.7126 11.1623C18.8121 11.6891 19.0682 12.1738 19.4473 12.5529C19.8264 12.932 20.3111 13.1881 20.8379 13.2876L28.2486 14.6889C28.5545 14.7461 28.8307 14.9084 29.0295 15.1477C29.2283 15.3871 29.3371 15.6885 29.3371 15.9996C29.3371 16.3108 29.2283 16.6121 29.0295 16.8515C28.8307 17.0908 28.5545 17.2531 28.2486 17.3103L20.8379 18.7116C20.3111 18.8111 19.8264 19.0672 19.4473 19.4463C19.0682 19.8255 18.8121 20.3101 18.7126 20.8369L17.3113 28.2476C17.2541 28.5535 17.0918 28.8297 16.8525 29.0285C16.6131 29.2273 16.3117 29.3361 16.0006 29.3361C15.6894 29.3361 15.3881 29.2273 15.1487 29.0285C14.9094 28.8297 14.7471 28.5535 14.6899 28.2476L13.2886 20.8369C13.1891 20.3101 12.933 19.8255 12.5539 19.4463C12.1747 19.0672 11.6901 18.8111 11.1633 18.7116L3.75259 17.3103C3.44673 17.2531 3.17048 17.0908 2.97168 16.8515C2.77288 16.6121 2.66406 16.3108 2.66406 15.9996C2.66406 15.6885 2.77288 15.3871 2.97168 15.1477C3.17048 14.9084 3.44673 14.7461 3.75259 14.6889L11.1633 13.2876C11.6901 13.1881 12.1747 12.932 12.5539 12.5529C12.933 12.1738 13.1891 11.6891 13.2886 11.1623L14.6899 3.75161Z"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M26.666 2.66699V8.00033"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M29.3333 5.33301H24"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.33268 29.3333C6.80544 29.3333 7.99935 28.1394 7.99935 26.6667C7.99935 25.1939 6.80544 24 5.33268 24C3.85992 24 2.66602 25.1939 2.66602 26.6667C2.66602 28.1394 3.85992 29.3333 5.33268 29.3333Z"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h3 className="p-h3">Execution</h3>
              <p>High-precision application using elite methodology.</p>
            </div>
          </motion.div>

          {/* STEP 04 */}
          <motion.div
            className="step p-step-4"
            variants={fade({ direction: "down", duration: 0.8, delay: 0.75 })}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="circle">04</div>
            <div className="step-content">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6899 3.75161C14.7471 3.44575 14.9094 3.1695 15.1487 2.9707C15.3881 2.77191 15.6894 2.66309 16.0006 2.66309C16.3117 2.66309 16.6131 2.77191 16.8525 2.9707C17.0918 3.1695 17.2541 3.44575 17.3113 3.75161L18.7126 11.1623C18.8121 11.6891 19.0682 12.1738 19.4473 12.5529C19.8264 12.932 20.3111 13.1881 20.8379 13.2876L28.2486 14.6889C28.5545 14.7461 28.8307 14.9084 29.0295 15.1477C29.2283 15.3871 29.3371 15.6885 29.3371 15.9996C29.3371 16.3108 29.2283 16.6121 29.0295 16.8515C28.8307 17.0908 28.5545 17.2531 28.2486 17.3103L20.8379 18.7116C20.3111 18.8111 19.8264 19.0672 19.4473 19.4463C19.0682 19.8255 18.8121 20.3101 18.7126 20.8369L17.3113 28.2476C17.2541 28.5535 17.0918 28.8297 16.8525 29.0285C16.6131 29.2273 16.3117 29.3361 16.0006 29.3361C15.6894 29.3361 15.3881 29.2273 15.1487 29.0285C14.9094 28.8297 14.7471 28.5535 14.6899 28.2476L13.2886 20.8369C13.1891 20.3101 12.933 19.8255 12.5539 19.4463C12.1747 19.0672 11.6901 18.8111 11.1633 18.7116L3.75259 17.3103C3.44673 17.2531 3.17048 17.0908 2.97168 16.8515C2.77288 16.6121 2.66406 16.3108 2.66406 15.9996C2.66406 15.6885 2.77288 15.3871 2.97168 15.1477C3.17048 14.9084 3.44673 14.7461 3.75259 14.6889L11.1633 13.2876C11.6901 13.1881 12.1747 12.932 12.5539 12.5529C12.933 12.1738 13.1891 11.6891 13.2886 11.1623L14.6899 3.75161Z"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M26.666 2.66699V8.00033"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M29.3333 5.33301H24"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.33268 29.3333C6.80544 29.3333 7.99935 28.1394 7.99935 26.6667C7.99935 25.1939 6.80544 24 5.33268 24C3.85992 24 2.66602 25.1939 2.66602 26.6667C2.66602 28.1394 3.85992 29.3333 5.33268 29.3333Z"
                  stroke="#FDC700"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h3 className="p-h3">Final Inspection</h3>
              <p>A rigorous quality audit to ensure absolute perfection.</p>
            </div>
            
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

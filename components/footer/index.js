"use client";
import Link from "next/link";
import moment from "moment";

const Footer = ({ data }) => {
  const date = new Date().getFullYear();

  const contact = data?.contact_us;

  return (
    <section className="footer-style-3 pt-30 pb-30">
      <div className="container">
        <div className="footer-widget-wrapper">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="footer-widget">
                <ul className="footer-link">
                  <li>
                    <Link href="/about">about us</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms-conditions">Terms And Conditions</Link>
                  </li>
                  <li>
                    <Link href="/refund-cancellation-policy" state="add">
                      Refund & Cancellation Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping-and-delivery-policy" state="cancel">
                      Shipping & Delivery Policy
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="/faqs">FAQ</Link>
                  </li>
                  <li>
                    <Link href="/contact-us">Contact Us</Link>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="footer-widget">
                <div className="footer-link">
                  <label className="text-white fw-bold">Contact Us:</label>
                  <p className="text-white">
                    Timings:{" "}
                    {moment(contact?.from_time, "hh:mm:ss").format("hh:mm a")}{" "}
                    to {moment(contact?.to_time, "hh:mm:ss").format("hh:mm a")}
                  </p>
                  <p className="text-white">Mobile: {contact?.phone}</p>
                  <p className="text-white">Email: {contact?.email}</p>
                  {/* <p className="text-white">
                    {contact?.content}
                  </p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="footer-top">
                <div className="footer-logo footer-widget footer-link text-center">
                  <Link href="/">
                    <img src="assets/img/footer-logo.png" alt="" />
                  </Link>
                  <div className="footer-copyright text-center">
                    <p>©{date} BookYourGift All Rights Reserved</p>
                  </div>
                </div>

                {/* <h5 className="heading-5 text-white text-center mt-30">
                  Follow Us
                </h5> */}
                {/* <ul className="footer-follow text-center">
                  <li>
                    <Link href="#">
                      <i className="fa fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-whatsapp"></i>
                    </Link>
                  </li>
                </ul> */}
              </div>
            </div>
            {/* <div className="col-sm-12 text-center mt-5">
                <div className="footer-logo text-center">
                  <Link href="/">
                    <img
                      src="assets/img/footer-logo.png"
                      alt=""
                      width="170"
                      height="100"
                    />
                  </Link>
                </div>
              </div>
              <div className="footer-copyright text-center">
                <p>©{date} BookYourGift All Rights Reserved</p>
              </div> */}
          </div>
          {/* <div className="row mt-5 text-white">
            <div className="col-sm-6 col-md-4 col-lg-4 text-center">
              <Link
                href="/terms-conditions"
                className="text-white cursor-pointer"
                prefetch={false}
              >
                Terms & Condtions
              </Link>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 text-center">
              <Link
                href="/privacy-policy"
                className="text-white cursor-pointer"
                prefetch={false}
              >
                Privacy Policy
              </Link>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 text-center">
              <Link
                href="/refund-cancellation-policy"
                className="text-white cursor-pointer"
                prefetch={false}
              >
                Refund & Cancellation Policy
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Footer;

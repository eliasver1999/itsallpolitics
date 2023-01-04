import React from "react";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className=" bg-zinc-800 py-4">
        <div className="grid grid-cols-4 items-start justify-between px-24 gap-4">
          <div className=" mt-4">
            <h3 className="text-center text-2xl mt-2 text-gray-200 mb-4">
              ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ
            </h3>
            <p className="text-gray-200 text-justify">
              Στόχος του WHAT POLITICS MEANS είναι να δώσει την ευκαιρία σε
              προπτυχιακούς φοιτητές όλων των τμημάτων Πολιτικής Επιστήμης και
              Διεθνών Σχέσεων να αρθρογραφήσουν, να σχολιάσουν και να ερευνήσουν
              σε θέματα που άπτονται το ακαδημαϊκό αντικείμενο των σχολών τους.
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-center text-2xl mt-2 text-gray-200 mb-4">
              ΜENOY
            </h2>
            <ul className="text-gray-200 list-disc text-center space-y-4">
              <li>
                <a href="/">ARXIKH</a>
              </li>
              <li>
                <a href="/">Σχετικά με εμάς</a>
              </li>
              <li>
                <a href="/">Επικοινωνία</a>
              </li>
              <li>
                <a href="/">Όροι Χρήσης</a>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-center text-2xl mt-2 text-gray-200 mb-4">
              ΚΑΤΗΓΟΡΙΕΣ
            </h2>
            <ul className="text-gray-200 list-disc text-center space-y-4">
              <li>
                <a href="/">ΔΙΕΘΝΗ</a>
              </li>
              <li>
                <a href="/">ΚΟΙΝΩΝΙΑ</a>
              </li>
              <li>
                <a href="/">ΟΙΚΟΝΟΜΙΑ</a>
              </li>
              <li>
                <a href="/">ΠΟΛΙΤΙΚΗ</a>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-center text-2xl mt-2 text-gray-200 mb-4">
              ΕΠΙΚΟΙΝΩΝΙΑ
            </h3>
            <ul className="text-gray-200 list-none text-center space-y-4">
              <li>
                <BsTelephone className="inline-block mr-4" />
                <h4 className="inline-block">2104511835</h4>
              </li>
              <li>
                <AiOutlineMail className="inline-block mr-4" />
                <h4 className="inline-block">eliasver99@gmail.com</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900">
        <h3 className="text-center text-gray-100">All rights reserved</h3>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import Article from "../components/cards/Article";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

type Props = {};

const Politics = (props: Props) => {
  return (
    <>
      <Navbar />

      <div className="mt-8 mx-auto block">
        <div className="mb-32">
          <h3 className="text-3xl font-semibold md:px-64 text-center bg-gray-200 p-8">
            ΠΟΛΙΤΙΚΗ
          </h3>
          <div className="grid grid-cols-3 justify-center items-center  gap-16 px-12 mt-12">
            <div>
              <Article
                id={1}
                image="art1.jpg"
                title="Πίσω από αθώες ψυχές"
                date="29 Δεκεμβρίου, 2022"
                category="ΚΟΙΝΩΝΙΑ"
                description="Ποιος ορισμός μπορεί να αποδώσει καλύτερα την έννοια της παιδικής πορνογραφίας; Ποια λέξη, ποια δήλωση, ποια ποινή όσο σκληρή, όσο"
              />
            </div>
            <div>
              <Article
                id={2}
                image="art1.jpg"
                title="Πίσω από αθώες ψυχές"
                date="29 Δεκεμβρίου, 2022"
                category="ΚΟΙΝΩΝΙΑ"
                description="Ποιος ορισμός μπορεί να αποδώσει καλύτερα την έννοια της παιδικής πορνογραφίας; Ποια λέξη, ποια δήλωση, ποια ποινή όσο σκληρή, όσο"
              />
            </div>
            <div>
              <Article
                id={1}
                image="art1.jpg"
                title="Πίσω από αθώες ψυχές"
                date="29 Δεκεμβρίου, 2022"
                category="ΚΟΙΝΩΝΙΑ"
                description="Ποιος ορισμός μπορεί να αποδώσει καλύτερα την έννοια της παιδικής πορνογραφίας; Ποια λέξη, ποια δήλωση, ποια ποινή όσο σκληρή, όσο"
              />
            </div>
            <div>
              <Article
                id={1}
                image="art1.jpg"
                title="Πίσω από αθώες ψυχές"
                date="29 Δεκεμβρίου, 2022"
                category="ΚΟΙΝΩΝΙΑ"
                description="Ποιος ορισμός μπορεί να αποδώσει καλύτερα την έννοια της παιδικής πορνογραφίας; Ποια λέξη, ποια δήλωση, ποια ποινή όσο σκληρή, όσο"
              />
            </div>
            <div>
              <Article
                id={1}
                image="art1.jpg"
                title="Πίσω από αθώες ψυχές"
                date="29 Δεκεμβρίου, 2022"
                category="ΚΟΙΝΩΝΙΑ"
                description="Ποιος ορισμός μπορεί να αποδώσει καλύτερα την έννοια της παιδικής πορνογραφίας; Ποια λέξη, ποια δήλωση, ποια ποινή όσο σκληρή, όσο"
              />
            </div>
            <div>
              <Article
                id={1}
                image="art1.jpg"
                title="Πίσω από αθώες ψυχές"
                date="29 Δεκεμβρίου, 2022"
                category="ΚΟΙΝΩΝΙΑ"
                description="Ποιος ορισμός μπορεί να αποδώσει καλύτερα την έννοια της παιδικής πορνογραφίας; Ποια λέξη, ποια δήλωση, ποια ποινή όσο σκληρή, όσο"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Politics;

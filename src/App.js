
import "./App.css";

// PDF के पहले पेज का संदेश
const HEADER_MESSAGE = `🌹 ॥ श्री गणेशाय नमः ॥ 🌹

💐 मालवांचल साहू समाज 💐
🌸 वैवाहिक परिचय पत्र 🌸

🤝 एक परिचय — नए रिश्ते की शुरुआत
❤️ एक रिश्ता — दो परिवारों का मिलन

समाज की एकता, सहयोग एवं निःस्वार्थ सेवा को समर्पित। 🌹`;

// PDF के अंतिम पेज का संदेश
const FOOTER_TITLE = "🙏 जय साहू समाज 🙏";
const FOOTER_SUBTITLE = "🌺 रिश्ते जोड़ें, समाज जोड़ें। 🌺";

const FOOTER_INTRO = `हमारा उद्देश्य: समाज के विवाह योग्य युवक-युवतियों एवं परिवारों को निःशुल्क वैवाहिक परिचय का अवसर प्रदान करना।`;

const FOOTER_POINTS = [
  "बायोडाटा में दी गई जानकारी की पुष्टि स्वयं करें।",
  "रिश्ता तय करने से पहले दोनों परिवारों की सहमति आवश्यक है।",
  "सभी की व्यक्तिगत जानकारी एवं गोपनीयता का सम्मान करें।",
];

const FOOTER_SOCIETY = "💐 मालवांचल साहू समाज 💐";
const FOOTER_SLOGAN =
  "निःस्वार्थ समाज सेवा — समाज की एकता, हमारा संकल्प।";

// src/assets/biodata से images लोड करें
const imageModules = import.meta.glob(
  "./assets/biodata/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const permanentImages = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => ({
    id: `saved-${index}`,
    name: path.split("/").pop(),
    src,
  }));

export default function App() {
  const biodatas = permanentImages;

  return (
    <main className="app">
      {/* Website heading: PDF में नहीं दिखेगी */}
      

      {biodatas.length === 0 ? (
        <section className="empty no-print">
          <h2>कोई बायोडाटा नहीं मिला</h2>
          <p>
            अपनी तस्वीरें src/assets/biodata फोल्डर में रखें।
          </p>
        </section>
      ) : (
        <section className="gallery">
          {biodatas.map((item, index) => (
            <article className="biodata-card" key={item.id}>
              {/* केवल पहले बायोडाटा से पहले हेडिंग */}
              {index === 0 && (
                <div className="pdf-header-message">
                  {HEADER_MESSAGE}
                </div>
              )}

              {/* वेबसाइट पर ही filename और count */}
              <div className="card-heading no-print">
                <span>{item.name}</span>
                <span>
                  {index + 1} / {biodatas.length}
                </span>
              </div>

              {/* बायोडाटा इमेज */}
              <div className="image-frame">
                <img
                  src={item.src}
                  alt={`बायोडाटा ${index + 1}`}
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
            </article>
          ))}
        </section>
      )}

      {/* PDF का अलग अंतिम पेज */}
      {biodatas.length > 0 && (
        <section className="pdf-footer-page">
          <div className="footer-page-content">
            <div className="footer-decor">🌹 ❖ 🌹</div>

            <h1>{FOOTER_TITLE}</h1>

            <h2>{FOOTER_SUBTITLE}</h2>

            <p className="footer-intro">{FOOTER_INTRO}</p>

            <div className="footer-divider" />

            <h3>📌 कृपया ध्यान दें</h3>

            <ul>
              {FOOTER_POINTS.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <div className="footer-divider" />

            <h2 className="footer-society">
              {FOOTER_SOCIETY}
            </h2>

            <p className="footer-slogan">{FOOTER_SLOGAN}</p>

            <p className="footer-closing">
              🌹 ॥ श्री गणेशाय नमः ॥ 🌹
            </p>
          </div>
        </section>
      )}

      {/* Website footer: PDF में नहीं दिखेगा */}
      <footer className="footer no-print">
        🙏 जय साहू समाज 🙏
        <p>🌺 रिश्ते जोड़ें, समाज जोड़ें। 🌺</p>
        <p>
          मालवांचल साहू समाज — वैवाहिक परिचय
        </p>
      </footer>
    </main>
  );
}

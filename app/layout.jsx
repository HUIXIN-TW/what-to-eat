import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metedata = {
  title: "what-to-eat",
  description: "Store and share your favorite lunch Ideas.",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;

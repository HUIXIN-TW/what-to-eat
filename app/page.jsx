import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-xs:hidden" />
        <span className="orange_gradient">Everyday Lunch Option</span>
      </h1>
      <p className="desc text-center">
        Embark on a culinary journey right from your screen. Explore a world
        where every lunch is an adventure, and your next favorite meal is just a
        click away. Join our community of food lovers in celebrating the joy of
        daily discoveries. Share your finds, savor new flavors, and transform
        your lunchtime into an exploration of taste
      </p>

      <Feed />
    </section>
  );
};

export default Home;

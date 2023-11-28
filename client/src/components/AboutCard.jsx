const AboutCard = ({ direction = "left" }) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12">
      {direction === "left" ? (
        <>
          <div>
            <img
              src="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
              alt=""
            />
          </div>
          <div className="flex items-center">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
              quasi voluptates expedita molestiae dolores deserunt sit
              consequuntur nulla. Quaerat accusamus similique asperiores
              repudiandae dolore perferendis nam blanditiis adipisci eum harum?
              A veritatis similique quod rem, perferendis ad ipsam pariatur vel
              hic inventore quia. Ratione obcaecati deserunt dicta, ipsam quis,
              rerum accusamus tempore voluptate nisi delectus neque. Nesciunt
              iste quibusdam odio.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
              quasi voluptates expedita molestiae dolores deserunt sit
              consequuntur nulla. Quaerat accusamus similique asperiores
              repudiandae dolore perferendis nam blanditiis adipisci eum harum?
              A veritatis similique quod rem, perferendis ad ipsam pariatur vel
              hic inventore quia. Ratione obcaecati deserunt dicta, ipsam quis,
              rerum accusamus tempore voluptate nisi delectus neque. Nesciunt
              iste quibusdam odio.
            </p>
          </div>
          <div>
            <img
              src="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AboutCard;

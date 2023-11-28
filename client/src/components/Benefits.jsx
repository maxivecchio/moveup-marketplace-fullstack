import {
  RiBankCardLine,
  RiTruckLine,
  RiLock2Line,
} from "react-icons/ri";

const Benefits = () => {
  const benefits = [
    {
      name: "MÉTODOS DE PAGO",
      icon: <RiBankCardLine className="text-4xl" />,
    },
    {
      name: "ENVIO",
      icon: <RiTruckLine className="text-4xl" />,
    },
    {
      name: "COMPRA 100% SEGURA",
      icon: <RiLock2Line className="text-4xl" />,
    }
  ];

  return (
    <div className="max-w-7xl mx-auto bg-background dark:bg-background px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-4 lg:gap-16">
      {benefits.map((benefit) => {
        return (
          <div
            key={benefit.name}
            className="rounded-lg flex border-2 font-semibold px-2 py-3 text-lg items-center gap-x-4 justify-center sm:justify-evenly"
          >
            {benefit.icon}
            {benefit.name}
          </div>
        );
      })}
    </div>
  );
};

export default Benefits;

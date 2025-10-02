export const calculateEstimate = (service, device) => {
  if (!service || !device) return null;
  let laborFee = 20; 
  if (device.name === "Laptop" || device.name === "Desktop PC" || device.name === "Gaming Console" || device.name === "Drone") {
    laborFee = 50; 
  } else if (device.name === "Smartwatch" || device.name === "Bluetooth Headphones" || device.name === "E-reader") {
    laborFee = 15; 
  }

  const estimate = service.basePrice * device.multiplier + laborFee;
  return Math.round(estimate * 100) / 100; 
};

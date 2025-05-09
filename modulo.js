export const esValido = (e) => {
  e.preventDefault();
  const obj = {};
  const campos = [...e.target].filter((elemento) => {
    return elemento.hasAttribute("required");
  });

  const radios = [...campos].filter((elemento) => elemento.type === "radio");
  const checkbox = [...campos].filter(
    (elemento) => elemento.type === "checkbox"
  );

  const campo_radio = radios.find((radio) => radio.checked) || [];
  if (campo_radio.length === 0) {
    obj[radios[0]?.name] = "";
  } else {
    obj[radios[0]?.name] = campo_radio.value;
  }

  const campo_checkbox = checkbox.filter((e) => e.checked);
  if (campo_checkbox.length < 3) {
    obj[checkbox[0]?.name] = "";
  } else {
    obj[checkbox[0]?.name] = [...campo_checkbox].map((e) => e.value);
  }

  campos.forEach((campo) => {
    switch (campo.tagName) {
      case "INPUT":
        if (
          campo.type === "text" ||
          campo.type === "number" ||
          campo.type === "password" ||
          campo.type === "tel"
        ) {
          obj[campo.name] = campo.value;

          // Validación específica según el tipo de input
          if (campo.value.trim() === "") {
            campo.classList.add("error");
          } else {
            campo.classList.remove("error");
            switch (campo.type) {
              case "text":
                if (!/^[a-zA-Z\s]*$/.test(campo.value)) {
                  campo.classList.add("error");
                  alert(`El campo ${campo.name} solo debe contener letras.`);
                }
                break;
              case "number":
                if (!/^\d*$/.test(campo.value)) {
                  campo.classList.add("error");
                  alert(`El campo ${campo.name} solo debe contener números.`);
                }
                break;
              case "password":
                if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]*$/.test(campo.value)) {
                  campo.classList.add("error");
                  alert(
                    `El campo ${campo.name} debe contener letras y números.`
                  );
                }
                break;
              case "tel":
                if (!/^[0-9+\-()\s]*$/.test(campo.value)) {
                  campo.classList.add("error");
                  alert(
                    `El campo ${campo.name} debe contener un formato telefónico válido.`
                  );
                }
                break;

              default:
                break;
            }
          }
        }
        break;
      case "SELECT":
        obj[campo.name] = campo.selectedIndex;
        if (campo.selectedIndex === 0) {
          campo.classList.add("error");
        } else {
          campo.classList.remove("error");
        }
        break;

      default:
        break;
    }
  });

  return obj;
};

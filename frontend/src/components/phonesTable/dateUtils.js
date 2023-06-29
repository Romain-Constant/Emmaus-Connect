/*  Fonction de conversion de la date */
export function convertDate(dateString) {
  var date = new Date(dateString);

  // Obtention des composantes de la date
  var day = date.getDate();
  var month = date.getMonth() + 1; // Les mois commencent à partir de 0 (janvier = 0)
  var year = date.getFullYear();

  // Formatage de la date avec des zéros devant si nécessaire
  var formattedDate =
    (day < 10 ? "0" + day : day) +
    "/" +
    (month < 10 ? "0" + month : month) +
    "/" +
    year;

  return formattedDate;
}

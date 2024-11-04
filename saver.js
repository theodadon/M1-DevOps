//saver.js
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const teaDataFilename = 'data.json';

/**
 * @typedef {Object} Tea
 * @property {number} id - id du thé, doit être unique et ne peut pas être modifié
 * @property {string} name - nom du thé, doit être unique et ne peut pas être modifié
 * @property {string} description - détails sur l'infusion, les effets secondaires, etc.
 */

/**
 * @returns {Array<Tea>} Tous les thés
 */
function listTeas() {
  if (!existsSync(teaDataFilename)) {
    return [];
  }

  const fileContent = readFileSync(teaDataFilename, 'utf8');
  return JSON.parse(fileContent);
}

/**
 *
 * @param {Tea['name']} teaName
 * @returns {Tea|undefined} Le thé correspondant au nom fourni
 */
function getTeaByName(teaName) {
  return listTeas().find(tea => tea.name === teaName);
}

/**
 *
 * @param {Tea} newTea
 */
function saveTea(newTea) {
  const teas = listTeas();

  // Vérifier que le nom est unique
  const teaByName = teas.find(tea => tea.name === newTea.name);
  if (teaByName && teaByName.id !== newTea.id) {
    throw new Error(`Un thé nommé "${newTea.name}" infuse déjà ! Trouve un autre nom, sinon ça risque de faire des jaloux.`);
  }

  // Vérifier que l'ID est unique
  const teaById = teas.find(tea => tea.id === newTea.id);
  if (teaById && teaById.name !== newTea.name) {
    throw new Error(`L'ID ${newTea.id} est déjà occupé par un autre thé. On ne peut pas verser deux thés dans la même tasse !`);
  }

  const newTeas = [
    ...teas.filter(tea => tea.id !== newTea.id),
    newTea,
  ];

  const newFileContent = JSON.stringify(newTeas, null, 2);

  writeFileSync(teaDataFilename, newFileContent);
}

/**
 *
 * @returns {number}
 */
function generateNewTeaId() {
  return Date.now();
}

module.exports = {
  getTeaByName,
  saveTea,
  generateNewTeaId,
};

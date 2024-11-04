//saver.test.js
import { describe, test, expect, vi } from 'vitest';
import { getTeaByName, saveTea, generateNewTeaId } from './saver';
import fs from 'node:fs';

vi.mock('node:fs');

describe('getTeaByName', () => {
  test("devrait renvoyer un thé existant lorsqu'un nom valide est fourni", () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify([{ id: 1, name: 'Green Tea', description: 'A soothing tea' }]));

    const result = getTeaByName('Green Tea');

    expect(result).toEqual({ id: 1, name: 'Green Tea', description: 'A soothing tea' });
  });

  test("devrait renvoyer undefined si le nom du thé n'existe pas dans la liste", () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify([{ id: 1, name: 'Green Tea', description: 'A soothing tea' }]));

    const result = getTeaByName('Black Tea');

    expect(result).toBeUndefined();
  });

  test("devrait gérer les cas où le fichier de données n'existe pas (retourne une liste vide)", () => {
    fs.existsSync.mockReturnValue(false);

    const result = getTeaByName('Green Tea');

    expect(result).toBeUndefined();
  });
});

describe('saveTea', () => {
  test("devrait sauvegarder un thé valide avec un nom et un ID uniques", () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify([]));
    fs.writeFileSync.mockImplementation(() => {});

    const newTea = { id: 2, name: 'Black Tea', description: 'A strong tea' };
    saveTea(newTea);

    expect(fs.writeFileSync).toHaveBeenCalledWith('data.json', JSON.stringify([newTea], null, 2));
  });

  test("devrait lancer une erreur si un thé avec le même nom mais un ID différent existe déjà", () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify([{ id: 1, name: 'Green Tea' }]));

    const newTea = { id: 2, name: 'Green Tea', description: 'Duplicate name' };

    expect(() => saveTea(newTea)).toThrow("Un thé nommé \"Green Tea\" infuse déjà ! Trouve un autre nom, sinon ça risque de faire des jaloux.");
  });

  test("devrait lancer une erreur si un thé avec le même ID mais un nom différent existe déjà", () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify([{ id: 1, name: 'Green Tea' }]));

    const newTea = { id: 1, name: 'Black Tea', description: 'Duplicate ID' };

    expect(() => saveTea(newTea)).toThrow("L'ID 1 est déjà occupé par un autre thé. On ne peut pas verser deux thés dans la même tasse !");
  });
});

describe('generateNewTeaId', () => {
  test("devrait générer un ID unique à chaque appel", async () => {
    const id1 = generateNewTeaId();
    await new Promise(resolve => setTimeout(resolve, 1));
    const id2 = generateNewTeaId();
    expect(id1).not.toBe(id2);
  });
});

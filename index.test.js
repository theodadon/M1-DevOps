//index.test.js
import { describe, test, expect, vi } from 'vitest';
import { addTea } from './index';
import { getTeaByName, saveTea, generateNewTeaId } from './saver';

vi.mock('./saver', () => ({
  getTeaByName: vi.fn(),
  saveTea: vi.fn(),
  generateNewTeaId: vi.fn(),
}));

describe('addTea', () => {
  test("devrait créer un nouveau thé si le nom du thé n'existe pas déjà", () => {
    getTeaByName.mockReturnValue(undefined);
    generateNewTeaId.mockReturnValue(123);

    const result = addTea({ name: 'Green Tea', description: 'Un thé rafraîchissant' });

    expect(saveTea).toHaveBeenCalledWith({ id: 123, name: 'Green Tea', description: 'Un thé rafraîchissant' });
    expect(result).toEqual({ success: true });
  });

  test("devrait mettre à jour un thé existant si le nom du thé est déjà utilisé", () => {
    getTeaByName.mockReturnValue({ id: 456, name: 'Green Tea' });

    const result = addTea({ name: 'Green Tea', description: 'Description mise à jour' });

    expect(saveTea).toHaveBeenCalledWith({ id: 456, name: 'Green Tea', description: 'Description mise à jour' });
    expect(result).toEqual({ success: true });
  });

  test("devrait renvoyer { success: false } et capturer l'erreur si saveTea lance une erreur", () => {
    getTeaByName.mockReturnValue(undefined);
    generateNewTeaId.mockReturnValue(789);
    saveTea.mockImplementation(() => { throw new Error('Erreur de sauvegarde - Thé refusé'); });

    const result = addTea({ name: 'Black Tea', description: 'Un thé fort' });

    expect(result).toEqual({ success: false });
  });
});

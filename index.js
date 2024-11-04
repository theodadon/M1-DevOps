import { generateNewTeaId, getTeaByName, saveTea } from './saver';

export function addTea(teaDto) {
  const existingTea = getTeaByName(teaDto.name);

  const teaToCreate = {
    ...teaDto,
    id: existingTea ? existingTea.id : generateNewTeaId(),
  };

  try {
    saveTea(teaToCreate);
  } catch (e) {
    console.error(`Oups ! Une erreur est survenue : ${e.message}. Impossible de faire infuser ce thé.`);
    return {
      success: false,
    };
  }

  console.log(`Le thé "${teaDto.name}" a été ajouté ou mis à jour avec succès !`);
  return {
    success: true,
  };
}

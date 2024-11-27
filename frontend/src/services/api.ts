import axios from "axios";

export const ApiTest = async () => {
  const response = await axios.get("/api/items");
  return response.data;
};

export const fetchExerciseAnalysisData = async (userId: string) => {
  console.log(userId);

  return {
    first_2week: {
      total_questions: 100,
      total_correct: 50,
      correct_percentage: 50,
    },
    second_2week: {
      total_questions: 10,
      total_correct: 10,
      correct_percentage: 100,
    },
    third_2week: {
      total_questions: 100,
      total_correct: 75,
      correct_percentage: 75,
    },
    fourth_2week: {
      total_questions: 150,
      total_correct: 15,
      correct_percentage: 10,
    },
  };
};

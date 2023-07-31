import * as yup from "yup";

export const createTeamSchema = yup.object().shape({
  name: yup.string().required(),
  memberNumber: yup.number().integer().min(11).required(),
});

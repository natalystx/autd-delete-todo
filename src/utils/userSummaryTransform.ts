import { UserDto } from "../types/user.dto";

export type FormattedUserData = Record<
  string,
  {
    male: number;
    female: number;
    ageRange: string;
    hair: Record<string, number>;
    addressUser: Record<string, string>;
  }
>;

export const userSummaryTransform = (data: UserDto[]): FormattedUserData => {
  const formattedData: FormattedUserData = {};
  const ages: Record<string, number[]> = {};
  const hairs: Record<string, Record<string, number>> = {};
  const userAddress: Record<string, Record<string, string>> = {};

  const updateAge = (department: string, age: number) => {
    if (!ages?.[department]) {
      ages[department] = [age, 0];
    } else {
      if (age < ages[department][0]) {
        ages[department][0] = age;
      }

      if (age > ages[department][1]) {
        ages[department][1] = age;
      }
    }
  };

  const updateHairs = (department: string, hairColor: string) => {
    if (!hairs?.[department]) {
      hairs[department] = { [hairColor]: 1 };
    }

    if (hairColor in hairs[department]) {
      hairs[department][hairColor] += 1;
    } else {
      hairs[department][hairColor] = 1;
    }
  };

  const updateUserAddress = (
    department: string,
    name: string,
    zipcode: string
  ) => {
    if (!userAddress?.[department]) {
      userAddress[department] = {
        [name]: zipcode,
      };
    } else {
      userAddress[department] = { ...userAddress[department], [name]: zipcode };
    }
  };

  data.forEach((user) => {
    const department = user.company.department;
    updateAge(department, user.age);
    updateHairs(department, user.hair.color);
    updateUserAddress(
      department,
      `${user.firstName}${user.lastName}`,
      user.address.postalCode
    );

    if (user.company.department in formattedData) {
      const male = formattedData[user.company.department].male;
      const female = formattedData[user.company.department].male;
      formattedData[user.company.department] = {
        male: user.gender === "male" ? male + 1 : male,
        female: user.gender === "female" ? female + 1 : female,
        ageRange: `${ages[department][0]}-${ages[department][1]}`,
        hair: { ...hairs[department] },
        addressUser: { ...userAddress[department] },
      };
    } else {
      formattedData[user.company.department] = {
        male: user.gender === "male" ? 1 : 0,
        female: user.gender !== "male" ? 1 : 0,
        ageRange: `${ages[department][0]}${
          ages[department][1] > 0 ? `${ages[department][1]}` : ""
        }`,
        hair: { ...hairs[department] },
        addressUser: { ...userAddress[department] },
      };
    }
  });

  return formattedData;
};

"use server";
import { ID } from "node-appwrite";
import { createSessionClient, createAdminClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    
    cookies().set("bankapp-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });


    return parseStringify(session);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;

  try {
    console.log("Creando cliente de Appwrite...");
    const { account } = await createAdminClient();
    console.log("Cliente creado, creando usuario...");

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    console.log("Usuario creado:", newUserAccount);
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Sesión creada:", session);

    cookies().set("bankapp-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    console.log("Cookie establecida");
    return parseStringify(newUserAccount);
  } catch (error) {
    console.log("Error en signUp: ", error);
    // Aquí lanzamos el error para que el formulario lo pueda manejar
    throw new Error("Error al registrar al usuario");
  }
};

export async function getLoggedInUser() {
  try {
    // console.log("iniciando getLoggeInUser");
    const { account } = await createSessionClient();
    // console.log("Account: ",account);
    const user = await account.get();
    // console.log("User: ", user);
    return parseStringify(user);
  } catch (error) {
    // console.error("Error en getLoggedInUsers: ", error);
    console.error(error)
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("bankapp-session");

    await account.deleteSession("current")
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

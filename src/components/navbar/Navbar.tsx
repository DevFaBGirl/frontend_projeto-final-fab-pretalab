import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";  
import { auth, provider } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import * as S from "./styles";
import { FiLogOut } from "react-icons/fi";

 

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  console.log(user);


  const getShortenedName = (fullName: string | null): string => {
    if (!fullName) {
      return "";
    }
    const words = fullName.split(" ");
    return words.slice(0, 1).join(" ");
  };

  const signWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro ao fazer login com Google", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <S.StyledNavbar>
      {user && <NavLink to="/">Home</NavLink>}
      {user && <NavLink to="/criar-despesas">Criar Despesas</NavLink>}
      {user && <NavLink to="/dashboard">Dashboard</NavLink>}

      {user ? (
        <S.ProfileContainer>
          <S.UserImage src={user.photoURL} alt="Foto de perfil" />
          <S.UserName>Olá, {getShortenedName(user.displayName)}!</S.UserName>
          <S.LogoutButton onClick={handleSignOut}>
            <FiLogOut />
            Sair
          </S.LogoutButton>
        </S.ProfileContainer>
      ) : (
        <S.LoginButton onClick={signWithGoogle}>Login</S.LoginButton>
      )}
    </S.StyledNavbar>
  );
};

export default Navbar;
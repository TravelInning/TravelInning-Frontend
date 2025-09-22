import axios from "axios";
import { API_URL } from "@env";
import { showToast } from "../../component/Toast";

// --------------- SMS ---------------
// SMS request
export const sendSMScode = async (phoneNumber) => {
  try {
    await axios.post(
      `${API_URL}/api/members/sms/auth`,
      {
        phoneNumber: phoneNumber.replace(/-/g, ""),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return true;
  } catch (error) {
    console.log("send SMScode error: ", error);
    return false;
  }
};

// SMS code verify
export const verifySMScode = async (phoneNumber, verificationCode) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/members/sms/auth/verify`,
      {
        phoneNumber: phoneNumber.replace(/-/g, ""),
        code: verificationCode.toString(),
      }
    );

    return response.data?.isSuccess || false;
  } catch (error) {
    console.log("verify SMScode error: ", error);
    return false;
  }
};
// -----------------------------------
// -------------- Email --------------
export const checkEmail = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/members/email/duplicate`,
      {
        email,
      }
    );
    return !response.data?.result.checkLoginId;
  } catch (error) {
    console.log("check email error: ", error);
    showToast("이메일 중복 확인에 실패했습니다. 다시 시도해주세요.");
    return false;
  }
};

export const sendEmailCode = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/api/members/email/auth`, {
      email: email,
    });
    console.log("이메일 코드:", response.data);
    return true;
  } catch (error) {
    console.log("send email code error : ", error);
    showToast("인증 번호 전송에 실패했습니다. 다시 시도해주세요.");
    return false;
  }
};

export const verifyEmailCode = async (email, verificationCode) => {
  try {
    await axios.post(`${API_URL}/api/members/email/auth/verify`, {
      email: email,
      code: verificationCode,
    });
    return true;
  } catch (error) {
    console.log("verify email code error: ", error);
    showToast("인증 번호가 올바르지 않습니다.");
    return false;
  }
};
// -----------------------------------
// ------------ NickName -------------
export const handleNickname = async (nickname, setIsError) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/members/nickname/duplicate`,
      {
        nickname: nickname,
      }
    );
    setIsError(false);
    return data?.result.checkNickname || false;
  } catch (error) {
    console.log("nickname check: ", error);
    showToast(`닉네임 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.`);
    setIsError(true);
    return false;
  }
};
// -----------------------------------
// ---------- SignUp(Terms) ----------
export const handleSignUp = async (
  nickname,
  password,
  email,
  gender,
  introduceMessage,
  selectedTerms
) => {
  try {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        nickname,
        password,
        email,
        gender,
        introduceMessage,
        memberTerm: selectedTerms,
      })
    );
    formData.append("profileImage", "");
    const result = await axios.post(`${API_URL}/api/members/join`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data.isSuccess;
  } catch (error) {
    console.log("member join error: ", error);
    showToast("오류가 발생했습니다. 다시 시도해주세요.");
    return false;
  }
};
// -----------------------------------

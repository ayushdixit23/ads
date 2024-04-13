"use client"
import Ad1 from "@/app/spliting/Ad1";
import Ad2 from "@/app/spliting/Ad2";
import Ad3 from "@/app/spliting/Ad3";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/Essentials";
// import { formatDateToString, getData } from "../utils/useful";
import { useDispatch, useSelector } from "react-redux";
import { setValidateStep1, setValidateStep2, setThree, setStep, setAudience } from "../redux/slice/dataSlice";
import { useGetCommunityQuery } from "../redux/slice/apiSlice";
import Cookies from "js-cookie";
import { decryptaes } from "../utils/security";
import { useAuthContext } from "../utils/AuthWrapper";

function page() {
  const { data: communityData } = useGetCommunityQuery()
  const three = useSelector((state) => state.data.three)
  // const { firstname, lastname, userid, image, advid } = getData()
  const { data } = useAuthContext()
  const [inputValue, setInputValue] = useState("");
  const [t, setT] = useState("");
  const [down, setDown] = useState(0);
  const [click, setCLick] = useState(0);
  const params = useSearchParams()
  // const []
  const urlStepsString = params.get("step")
  const urlSteps = Number(urlStepsString) - 1
  const [point, setPoint] = useState(null);

  const [PointsCategory, setPointsCategory] = useState([
    { category: "Movies & Entertainment", population: 70, price: 17 },
    { category: "News", population: 65, price: 14 },
    { category: "Pet & Animals", population: 60, price: 11 },
    { category: "Gaming", population: 80, price: 13 },
    { category: "Career & Education", population: 75, price: 13 },
    { category: "Anime & Manga", population: 77, price: 13 },
    { category: "Humor & Memes", population: 69, price: 13 },
    { category: "Family & Relationships", population: 59, price: 12 },
    { category: "Sports", population: 78, price: 12 },
    { category: "Science & Learning", population: 77, price: 12 },
    { category: "DIY & Crafts", population: 66, price: 12 },
    { category: "Music & Podcasts", population: 75, price: 12 },
    { category: "Beauty & Fashion", population: 63, price: 12 },
    { category: "Health & Fitness", population: 70, price: 12 },
    { category: "Food & Cooking", population: 62, price: 12 },
    { category: "Business & Finance", population: 58, price: 12 },
    { category: "Photography", population: 61, price: 13 },
    { category: "Travel & Gadgets", population: 59, price: 13 },
    { category: "Pop Culture", population: 58, price: 13 },
    { category: "Cars", population: 77, price: 13 },
    { category: "Motivation & Self-Help", population: 76, price: 13 }
  ]);
  const [myLocation, setMyLocation] = useState([])
  const [aud, setAud] = useState([]);
  const [men, setMen] = useState([]);
  const [female, setFemale] = useState([]);
  const [audbyCategory, setAudbyCategory] = useState(58);
  const [ctr, setCtr] = useState("");
  const dispatch = useDispatch()
  dispatch(setStep(urlSteps))

  const handleCategoryChange = (name, points, audbyCategory) => {

    // console.log(name, points, audbyCategory)
    dispatch(setThree({ category: name }))
    setAudbyCategory(audbyCategory);
    setPoint(points);
    // setCtr(ctr);
  };

  console.log(audbyCategory, "aadu")

  useEffect(() => {
    const selectedLocations = myLocation.filter((location) =>
      three.location.includes(location.name)
    );
    const audience = selectedLocations.map((location) => location.total);
    const menValues = selectedLocations.map((location) => location.male);
    const femaleValues = selectedLocations.map((location) => location.female);
    setMen(menValues);
    setFemale(femaleValues);
    setAud(audience);
  }, [three.location]);

  const handleCheckboxClick = () => {
    const inputElement = document.querySelector('input[name="selectinput"]');
    if (inputElement) {
      inputElement.focus();
    }
  };

  useEffect(() => {
    axios.get(`${API}/v1/fetchLocation`).then((res) => {
      setMyLocation(res.data.loc)
    })
  }, [])
  // const [myArray, setMyArray] = useState([]);
  const [myTags, setMyTags] = useState([]);

  const elementMappings = {
    infeed: 0.5,
    search: 0.2,
    skipable: 0.6,
    "non-skipable": 0.8,
    banner: 0.4,
  };

  // const newArray = myArray.map((element) => {
  //   if (element in elementMappings) {
  //     return elementMappings[element];
  //   }

  //   return element;
  // });

  // let sum = 0;

  // for (let i of newArray) {
  //   sum += i;
  // }

  const tagsMapping = {
    [myTags[0]]: Number((0.1 + Math.random() * 0.1).toFixed(2)),
    [myTags[1]]: Number((0.1 + Math.random() * 0.1).toFixed(2)),
    [myTags[2]]: Number((0.1 + Math.random() * 0.1).toFixed(2)),
    [myTags[3]]: Number((0.1 + Math.random() * 0.1).toFixed(2)),
    [myTags[4]]: Number((0.1 + Math.random() * 0.1).toFixed(2)),
  };

  const newTags = myTags.map((element) => {
    if (element in tagsMapping) {
      return tagsMapping[element];
    }
    return element;
  });

  let sumtags = 0;
  let average;

  for (let i of newTags) {
    sumtags += i;
  }

  average = sumtags / newTags.length;

  useEffect(() => {
    setMyTags(three.tags);
  }, [three.tags]);

  let totalAudience = 0
  for (let i = 0; i < aud.length; i++) {
    totalAudience += aud[i]
  }

  console.log(totalAudience, "aud")
  // const fullTotalCost = elementMappings[three.type] + point + average;
  // console.log(fullTotalCost, point, average);
  // console.log(fullTotalCost * 82);

  // let locwithAudience = aud;

  // sum of audience

  let totalMenAudience = 0;

  for (let i = 0; i < men.length; i++) {
    totalMenAudience += men[i];
  }

  // avgMen = (totalMenAudience / locwithMenAudience.length).toFixed(2);

  //   men audience by location end

  //   women audience by location start

  let totalWomenAudience = 0;

  for (let i = 0; i < female.length; i++) {
    totalWomenAudience += female[i];
  }

  // avgwomen = (totalWomenAudience / locwithWomenAudience.length).toFixed(2);

  //   women audience by location end

  // calculation according to gender age start
  let AudienceByGender;
  let AudiencebyAge;
  if (three.gender === "Men") {
    AudienceByGender = totalMenAudience
    if (three.selectedAgeRange === "12-18") {
      AudiencebyAge = Math.ceil(totalMenAudience * (20 / 100));
    } else if (three.selectedAgeRange === "19-40") {
      AudiencebyAge = Math.ceil(totalMenAudience * (60 / 100));
    } else if (three.selectedAgeRange === "41-65") {
      AudiencebyAge = Math.ceil(totalMenAudience * (20 / 100));
    } else {
      AudiencebyAge = totalMenAudience;
    }
  } else if (three.gender === "Women") {
    AudienceByGender = totalWomenAudience;
    if (three.selectedAgeRange === "12-18") {
      AudiencebyAge = Math.ceil(totalWomenAudience * (20 / 100));
    } else if (three.selectedAgeRange === "19-40") {
      AudiencebyAge = Math.ceil(totalWomenAudience * (60 / 100));
    } else if (three.selectedAgeRange === "41-65") {
      AudiencebyAge = Math.ceil(totalWomenAudience * (20 / 100));
    } else {
      AudiencebyAge = totalWomenAudience;
    }
  } else {
    AudienceByGender = totalAudience;
    if (three.selectedAgeRange === "12-18") {
      AudiencebyAge = AudienceByGender * (20 / 100);
    } else if (three.selectedAgeRange === "19-40") {
      AudiencebyAge = AudienceByGender * (60 / 100);
    } else if (three.selectedAgeRange === "41-65") {
      AudiencebyAge = totalAudience * (20 / 100);
    } else {
      AudiencebyAge = totalAudience;
    }
  }

  const ProperAudience = AudiencebyAge * audbyCategory / 100

  useEffect(() => {
    dispatch(setAudience(ProperAudience))
  }, [ProperAudience])

  const [date, setDate] = useState(false);

  const [user, setUser] = useState({
    fullname: "",
    photo: "",
    id: "",
  });

  const validateData = () => {
    if (
      three.location.length === 0 ||
      three.tags.length === 0 ||
      (three.age === "All age group"
        ? three.age === ""
        : three.selectedAgeRange === "") ||
      three.type === "" ||
      three.tags === "" ||
      three.duration === "" ||
      three.TotalBudget === "" ||
      three.category === "" ||
      (three.endDate && formatDateToString(three.endDate) < formatDateToString(three.startDate))
    ) {
      return false;
    } else {
      return true;
    }
  };

  dispatch(setValidateStep2(validateData()))

  const validateDatas = () => {
    if (three.comid) {
      if (
        three.Action === "" ||
        three.Description === "" ||
        three.Headline === "" ||
        three.link === "" ||
        three.adName === "" ||
        three.goal === "" ||
        three.media === ""
      ) {
        return false;
      } else {
        return true
      }
    } else {
      if (three.Action === "" ||
        three.Description === "" ||
        three.Headline === "" ||
        three.link === "" ||
        three.adName === "" ||
        three.goal === "" ||
        three.media === "" ||
        three.communityName === "" ||
        three.communityDesc === "" ||
        three.communityCategory === "" ||
        three.communityImage === "") {
        return false
      } else {
        return true
      }

    }

  };

  // const validateDatas = () => {
  //   if (
  //     three.Action === "" ||
  //     three.Description === "" ||
  //     three.Headline === "" ||
  //     three.link === "" ||
  //     three.adName === "" ||
  //     three.goal === "" ||
  //     three.pic === ""
  //   ) {
  //     return false;
  //   } else {
  //     return true
  //   }
  // };

  dispatch(setValidateStep1(validateDatas()))

  const myAgeHandle = () => {
    setCLick(1);
    dispatch(setThree({
      selectedAgeRange: "12-18",
      age: "",
      maxage: "18",
      minage: "12",
    }))

  };

  const handleAgeRangeChange = (event) => {
    const newValue = event.target.value;

    if (newValue) {
      const [min, max] = newValue.split("-").map(Number);
      dispatch(setThree({
        selectedAgeRange: newValue,
        minage: min,
        maxage: max,
      }))
    }
  };

  const f = async () => {
    try {
      setUser({
        fullname: data?.firstname + " " + data?.lastname,
        photo: image,
        id: data?.userid
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (data?.firstname && data?.lastname && data?.image && data?.userid) {
      f()
    }
  }, [data?.firstname, data?.lastname, data?.image, data?.userid]);

  // const handleFileChanges = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const fileExtension = file.name.split(".").pop().toLowerCase();

  //     if (["jpg", "jpeg", "png", "svg"].includes(fileExtension) && (three.type === "non-skipable" || three.type === "skipable")) {
  //       dispatch(setThree({
  //         pic: URL.createObjectURL(file),
  //         picname: file.name,
  //         picsend: file,
  //       }))
  //     } else if (["mp4", "avi", "mov", "mp3"].includes(fileExtension)) {
  //       dispatch(setThree({
  //         pic: null,
  //         picname: file.name,
  //         picsend: file,
  //       }))
  //     } else {

  //       alert("Unsupported file type. Please select an image or video.");
  //       e.target.value = "";
  //     }
  //   } else {
  //     dispatch(setThree({
  //       pic: null, picname: "", picsend: null
  //     }))
  //   }
  // };

  const handleFileChanges = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();

      console.log(file.type)

      console.log(fileExtension)

      if (file.type.startsWith("image") && (three.type !== "non-skipable" && three.type !== "skipable")) {
        dispatch(setThree({
          media: file,
          isImage: true
        }));
      } else if (file.type.startsWith("video") && three.type !== "banner") {
        dispatch(setThree({
          media: file,
          isImage: false
        }));
      } else {
        alert("Unsupported file type. Please select the appropriate file type.");
        e.target.value = "";
      }
    } else {
      dispatch(setThree({
        media: "",
      }));
    }
  };

  return (
    <>
      <div className="no-scrollbar select-none w-screen dark:bg-[#181a20] h-screen overflow-x-hidden">

        {(urlSteps === 0) && (<Ad2
          // setStep={setStep}
          // toggleType={toggleType}
          setThree={setThree}
          date={date}
          setDate={setDate}
          dispatch={dispatch}
          handleCheckboxClick={handleCheckboxClick}
          setT={setT}
          setCLick={setCLick}
          three={three}
          PointsCategory={PointsCategory}
          handleCategoryChange={handleCategoryChange}
          inputValue={inputValue}
          setInputValue={setInputValue}
          myAgeHandle={myAgeHandle}
          click={click}
          handleAgeRangeChange={handleAgeRangeChange}
          //isdatavalid={isdatavalid}
          // ProperAudience={ProperAudience}
          ctr={ctr}
          // pricebyDay={pricebyDay}
          // totalPrice={totalPrice}
          myLocation={myLocation}
          t={t}
          step={urlSteps}
        />)
        }

        {(urlSteps === 1) && (
          <Ad1
            // setStep={setStep}
            dispatch={dispatch}
            step={urlSteps}
            // validDatas={validDatas}
            three={three}
            setThree={setThree}
            down={down}
            setDown={setDown}
            handleFileChanges={handleFileChanges}
            user={user}
          />
        )}



        {(urlSteps === 2) && (<Ad3
          // setStep={setStep}
          // sendData={sendData}
          dispatch={dispatch}
          step={urlSteps}
          date={date}
          setStep={setStep}
          communityData={communityData}
          three={three}
        // pricebyDay={pricebyDay}
        // totalPrice={totalPrice}
        // tax={tax}
        // addTax={addTax}
        />)
        }
      </div>
    </>
  );
}

export default page;
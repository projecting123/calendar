"use client";
import totalDaysInMonth from "@/helper/totalDaysInMonth";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useEffect, useReducer, useRef, useState } from "react";

const selectReducer = (state, action) => {
  if (action.type !== "dayselection") {
    if (action.name == "year") {
      const daysInMonth = [];
      const firstDayInaMonth = new Date(
        `${action.value}-${state.month}-1`
      ).getDay();
      const totalDays = totalDaysInMonth(action.value, state.month);
      for (let i = 1; i <= totalDays; i++) {
        daysInMonth.push(i);
      }
      return {
        ...state,
        year: action.value,
        totalDays,
        firstDayInaMonth,
        daysInMonth,
      };
    } else if (action.name == "month") {
      const daysInMonth = [];
      const firstDayInaMonth = new Date(
        `${state.year}-${action.value}-1`
      ).getDay();
      const totalDays = totalDaysInMonth(state.year, action.value);
      for (let i = 1; i <= totalDays; i++) {
        daysInMonth.push(i);
      }
      return {
        ...state,
        month: action.value,
        totalDays,
        firstDayInaMonth,
        daysInMonth,
      };
    } else if (action.button == "prev") {
      const daysInMonth = [];
      if (state.month !== 1) {
        const firstDayInaMonth = new Date(
          `${state.year}-${state.month - 1}-1`
        ).getDay();
        const totalDays = totalDaysInMonth(state.year, state.month - 1);
        for (let i = 1; i <= totalDays; i++) {
          daysInMonth.push(i);
        }
        return {
          ...state,
          month: state.month - 1,
          totalDays,
          firstDayInaMonth,
          daysInMonth,
        };
      }
      const firstDayInaMonth = new Date(`${state.year - 1}-12-1`).getDay();
      const totalDays = totalDaysInMonth(state.year - 1, 12);
      for (let i = 1; i <= totalDays; i++) {
        daysInMonth.push(i);
      }
      return {
        ...state,
        month: 12,
        year: state.year - 1,
        totalDays,
        firstDayInaMonth,
        daysInMonth,
      };
    } else {
      const daysInMonth = [];
      if (state.month !== 12) {
        const firstDayInaMonth = new Date(
          `${state.year}-${state.month + 1}-1`
        ).getDay();
        const totalDays = totalDaysInMonth(state.year, state.month + 1);
        for (let i = 1; i <= totalDays; i++) {
          daysInMonth.push(i);
        }
        return {
          ...state,
          month: state.month + 1,
          year: state.year,
          firstDayInaMonth,
          totalDays,
          daysInMonth,
        };
      }
      const firstDayInaMonth = new Date(`${state.year + 1}-${1}-1`).getDay();
      const totalDays = totalDaysInMonth(state.year + 1, 1);
      for (let i = 1; i <= totalDays; i++) {
        daysInMonth.push(i);
      }
      return {
        ...state,
        month: 1,
        year: state.year + 1,
        firstDayInaMonth,
        totalDays,
        daysInMonth,
      };
    }
  }
  return { ...state, day: action.day };
};

export default function DateComponent() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();
  const years = [];
  const currentDays = [];
  for (let i = 1900; i <= 2099; i++) {
    years.push(i);
  }

  for (let i = 1; i <= totalDaysInMonth(currentYear, currentMonth); i++) {
    currentDays.push(i);
  }
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const days = {
    1: "Su",
    2: "Mo",
    3: "Tu",
    4: "We",
    5: "Th",
    6: "Fr",
    7: "Sa",
  };

  const [selected, selectDispatcher] = useReducer(selectReducer, {
    year: currentYear,
    month: currentMonth,
    day: currentDate,
    totalDays: totalDaysInMonth(currentYear, currentMonth),
    firstDayInaMonth: new Date(`${currentYear}-${currentMonth}-1`).getDay(),
    daysInMonth: currentDays,
  });

  const daylist = useRef();
  const [timeoutId, settimeoutId] = useState(null);
  const [isCalendarOpen, setOpen] = useState(false);
  const [isManuallyDaySelected, setManuallyDaySelected] = useState(false);
  const [isClickedYearSelection, setClickedYearSelection] = useState(false);
  const [isArrowButtonDisabled, setArrowButtonDisabled] = useState({left: false, right: false});
  const selectHandler = (e) => {
    selectDispatcher({ name: e.target.name, value: parseInt(e.target.value) });
  };

  const btnHandler = async (e) => {
    timeoutId && clearTimeout(timeoutId);
    if (e.target.closest("#leftarrow")) {
      selectDispatcher({ button: "prev" });
      daylist.current.classList.add(
        "transition-all",
        "translate-x-full",
        "duration-[30ms]"
      );
      const timeoutvalue = setTimeout(() => {
        daylist.current.classList.remove("translate-x-full");
      }, 150);
      settimeoutId(timeoutvalue);
    } else if (e.target.closest("#rightarrow")) {
      selectDispatcher({ button: "next" });
      daylist.current.classList.add(
        "transition-all",
        "-translate-x-full",
        "duration-[30ms]"
      );
      const timeoutvalue = setTimeout(() => {
        daylist.current.classList.remove("-translate-x-full");
      }, 150);
      settimeoutId(timeoutvalue);
    }
  };

  const daySelectHandler = (ev) => {
    setOpen(!isCalendarOpen);
    setManuallyDaySelected(true);
    selectDispatcher({ type: "dayselection", day: parseInt(ev.target.value) });
  };

  const calendarHandle = async () => {
    setOpen(!isCalendarOpen);
  };

  const yearSelectionHandler = async () => {
    setClickedYearSelection(!isClickedYearSelection);
  };

  const yearBtnSelectHandler = async (ev) => {
    setClickedYearSelection(!isClickedYearSelection);
    selectDispatcher({ name: "year", value: parseInt(ev.target.value) });
  };

  useEffect(() => {
    if(selected.year == 1900 && selected.month == 1){
      setArrowButtonDisabled({left:true, right: false})
    }
    else if(selected.year == 2099 && selected.month == 12){
      setArrowButtonDisabled({left:false, right: true})
    }
    else{
      setArrowButtonDisabled({left:false, right: false})
    }
  }, [selected])

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center select-none">
        <div className="relative flex items-center">
          <input
            type="text"
            aria-label="calendar"
            value={
              isManuallyDaySelected
                ? `${selected.day}/${selected.month}/${selected.year}`
                : `DD/MM/YYYY`
            }
            className="border-2 bg-zinc-200 font-semibold pl-4 h-12 w-[15rem] rounded-md border-sky-300 focus:ring-2 outline-none"
            readOnly
          />
          <button
            className="absolute active:scale-95 right-1 p-2 transition-all hover:bg-zinc-400 rounded-full hover:text-zinc-100"
            onClick={calendarHandle}
          >
            <CalendarMonthIcon />
          </button>

          {isCalendarOpen && (
            <div className="overflow-hidden absolute top-[3.2rem] border-2 text-white bg-zinc-700 w-[22rem] h-[21rem] shadow-xl rounded-xl border-sky-300 py-2">
              <div
                className={`flex items-center py-1 ${
                  !isClickedYearSelection
                    ? "justify-around"
                    : "justify-between ml-[1.22rem]"
                }`}
              >
                <div className="flex gap-1 items-center">
                  <button
                    onClick={yearSelectionHandler}
                    className="hover:bg-zinc-500 transition-all rounded-xl px-2 py-[0.2rem]"
                  >
                    {selected.year}
                    <ExpandMoreIcon />
                  </button>
                </div>

                {!isClickedYearSelection && (
                  <select
                    value={selected.month}
                    name="month"
                    id=""
                    onChange={selectHandler}
                    className="rounded-md bg-zinc-500 outline-none focus:ring-2"
                  >
                    {Object.keys(months).map((monthVal, id) => {
                      return (
                        <option key={id} value={monthVal}>
                          {months[monthVal]}
                        </option>
                      );
                    })}
                  </select>
                )}

                {!isClickedYearSelection && (
                  <div className="flex gap-2">
                    <button
                      className="hover:bg-zinc-600 rounded-sm transition-all"
                      onClick={btnHandler}
                      id="leftarrow"
                      disabled={isArrowButtonDisabled.left}
                    >
                      <KeyboardDoubleArrowLeftIcon />
                    </button>
                    <button
                      onClick={btnHandler}
                      className="hover:bg-zinc-600 rounded-sm transition-all"
                      id="rightarrow"
                      disabled={isArrowButtonDisabled.right}
                    >
                      <KeyboardDoubleArrowRightIcon />
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full h-[1px] bg-gray-500 opacity-70 mt-2"></div>
              {!isClickedYearSelection && (
                <ul className="grid grid-cols-7 place-items-center py-2">
                  {Object.keys(days).map((dayVal, id) => {
                    return (
                      <li key={id} className="font-semibold">
                        {days[dayVal]}
                      </li>
                    );
                  })}
                </ul>
              )}

              {!isClickedYearSelection && (
                <ul
                  ref={daylist}
                  className="grid grid-cols-7 place-items-center gap-y-[0.4rem]"
                >
                  {selected.firstDayInaMonth > 0 && (
                    <li
                      className={`col-span-${selected.firstDayInaMonth}`}
                    ></li>
                  )}
                  {selected.daysInMonth.map((dayNum, id) => {
                    return (
                      <button
                        key={id}
                        className={
                          dayNum == new Date().getDate() &&
                          selected.year == new Date().getFullYear() &&
                          selected.month == new Date().getMonth() + 1
                            ? "text-white bg-sky-500 px-3 py-1 rounded-full"
                            : Math.abs(dayNum).toString().length > 1
                            ? `hover:bg-sky-300 px-2 py-1 rounded-full transition-all ease-in-out`
                            : `hover:bg-sky-300 px-3 py-1 rounded-full transition-all ease-in-out`
                        }
                        value={dayNum}
                        onClick={daySelectHandler}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </ul>
              )}
              {isClickedYearSelection && (
                <div className="grid gap-y-3 gap-x-1 grid-cols-4 h-[266px] overflow-y-scroll scroll-smooth m-[0.2rem]">
                  {years.map((year, id) => {
                    return (
                      <>
                        <button
                          key={id}
                          className="hover:bg-zinc-500 rounded-full py-2"
                          onClick={yearBtnSelectHandler}
                          value={year}
                        >
                          {year}
                        </button>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

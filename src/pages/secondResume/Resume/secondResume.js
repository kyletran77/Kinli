import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./resume.css";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Paperclip,
  Phone,
} from "react-feather";

import styles from "./Resume.module.css";

const Resume = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();

  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, seTarget] = useState("");

  const info = {
    workExp: information[sections.workExp],
    project: information[sections.project],
    achievement: information[sections.achievement],


    education: information[sections.education],
    basicInfo: information[sections.basicInfo],
    summary: information[sections.summary],
    other: information[sections.other],
  };

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const sectionDiv = {
    [sections.workExp]: (
      <div
        key={"workexp"}
        draggable
        onDragOver={() => seTarget(info.workExp?.id)}
        onDragEnd={() => setSource(info.workExp?.id)}
        className={`${styles.section} ${
          info.workExp?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.workExp.sectionTitle}</div>
        <div className={styles.content}>
          {info.workExp?.details[0]?.map((item) => (
            <div className={styles.item} key={item.company}>
              {item.company ? (
                <p className={styles.title}>{item.company}</p>
              ) : (
                ""
              )}
              {item.companyName ? (
                <p className={styles.subTitle}>{item.companyName}</p>
              ) : (
                <span />
              )}
              {item.certificationLink ? (
                <a className={styles.link} href={item.certificationLink}>
                  <Paperclip />
                  {item.certificationLink}
                </a>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)}-
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                <div />
              )}
              {item.location ? (
                <p className={styles.date}>
                  <MapPin /> {(item.location)}
                </p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        draggable
        onDragOver={() => seTarget(info.project?.id)}
        onDragEnd={() => setSource(info.project?.id)}
        className={`${styles.section} ${
          info.project?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.project.sectionTitle}</div>
        <div className={styles.content}>
          {info.project?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.link ? (
                <a className={styles.link} href={item.link}>
                  <Paperclip />
                  {item.link}
                </a>
              ) : (
                <span />
              )}
              {item.github ? (
                <a className={styles.link} href={item.github}>
                  <GitHub />
                  {item.github}
                </a>
              ) : (
                <span />
              )}
              {item.overview ? (
                <p className={styles.overview}>{item.overview} </p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => seTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
        className={`${styles.section} ${
          info.education?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          {info.education?.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.education?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.college ? (
                <p className={styles.subTitle}>{item.college}</p>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)} -
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.achievement]: (
      <div
        key={"achievement"}
        draggable
        onDragOver={() => seTarget(info.achievement?.id)}
        onDragEnd={() => setSource(info.achievement?.id)}
        className={`${styles.section} ${
          info.achievement?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          {info.achievement?.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.achievement?.points?.length > 0 ? (
            <ul className={styles.numbered}>
              {info.achievement?.points?.map((elem, index) => (
                <li className={styles.point} key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
    [sections.summary]: (
      <div
        key={"summary"}
        draggable
        onDragOver={() => seTarget(info.summary?.id)}
        onDragEnd={() => setSource(info.summary?.id)}
        className={`${styles.section} ${
          info.summary?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.summary?.sectionTitle}</div>
        <div className={styles.content}>
          <p className={styles.overview}>{info.summary?.detail}</p>
        </div>
      </div>
    ),
    [sections.other]: (
      <div
        key={"other"}
        draggable
        onDragOver={() => seTarget(info.other?.id)}
        onDragEnd={() => setSource(info.other?.id)}
        className={`${styles.section} ${
          info.other?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.other?.sectionTitle}</div>
        <div className={styles.content}>
          <p className={styles.overview}>{info?.other?.detail}</p>
        </div>
      </div>
    ),
  };

  const swapSourceTarget = (source, target) => {
    if (!source || !target) return;
    const tempColumns = [[...columns[0]], [...columns[1]]];

    let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
    let sourceColumnIndex = 0;
    if (sourceRowIndex < 0) {
      sourceColumnIndex = 1;
      sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
    }

    let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = tempColumns[1].findIndex((item) => item === target);
    }

    const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
    tempColumns[sourceColumnIndex][sourceRowIndex] =
      tempColumns[targetColumnIndex][targetRowIndex];

    tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

    setColumns(tempColumns);
  };

  useEffect(() => {
    setColumns([
      [sections.project, sections.education, sections.summary],
      [sections.workExp, sections.achievement, sections.other],
    ]);
  }, []);

  useEffect(() => {
    swapSourceTarget(source, target);
  }, [source]);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (!props.activeColor || !container) return;

  //   container.style.setProperty("--color", props.activeColor);
  // }, [props.activeColor]);

  return (
    <div ref={ref}>
      <div ref={containerRef}>
      <body class="">
    <div class="mt-6 max-w-screen-lg md:flex mx-auto">
      <div class="md:w-1/3 p-2 relative">
        
            {/* <img
              class="h-32 w-32 rounded-full mx-auto mx-4"
              src="https://avatars3.githubusercontent.com/u/59800600?s=460&amp;u=95f222387f598c85508c9b6d5d8662ebf4ae8b85&amp;v=4"
            /> */}
            <div class="mb-12 text-center mt-4 justify-center items-center">
              <h1 class="text-2xl text-xl text-gray-800 font-bold">
              {info?.basicInfo?.detail?.name}
              </h1>
              <div class="md:text-lg text-gray-600">Software Engineer</div>
              <div class="text-gray-600 md:hidden mt-1">
                moh.usman168@gmail.com
           
          </div>
          <div class="mx-4 my-4 hidden md:block">
            <div class="my-5 text-lg text-gray-600 flex">
              <div class="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20,4H6C4.897,4,4,4.897,4,6v5h2V8l6.4,4.8c0.178,0.133,0.389,0.2,0.6,0.2s0.422-0.067,0.6-0.2L20,8v9h-8v2h8 c1.103,0,2-0.897,2-2V6C22,4.897,21.103,4,20,4z M13,10.75L6.666,6h12.668L13,10.75z"
                  />
                  <path d="M2 12H9V14H2zM4 15H10V17H4zM7 18H11V20H7z" />
                </svg>
              </div>
              moh.usman168@gmail.com
            </div>
            <div class="my-5 text-lg text-gray-600 flex">
              <div class="mr-2">
                <svg
                  class="text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12,14c2.206,0,4-1.794,4-4s-1.794-4-4-4s-4,1.794-4,4S9.794,14,12,14z M12,8c1.103,0,2,0.897,2,2s-0.897,2-2,2 s-2-0.897-2-2S10.897,8,12,8z"
                  />
                  <path
                    d="M11.42,21.814C11.594,21.938,11.797,22,12,22s0.406-0.062,0.58-0.186C12.884,21.599,20.029,16.44,20,10 c0-4.411-3.589-8-8-8S4,5.589,4,9.995C3.971,16.44,11.116,21.599,11.42,21.814z M12,4c3.309,0,6,2.691,6,6.005 c0.021,4.438-4.388,8.423-6,9.73C10.389,18.427,5.979,14.441,6,10C6,6.691,8.691,4,12,4z"
                  />
                </svg>
              </div>
              Bogor, Indonesia
            </div>
            <a
              href="https://www.linkedin.com/in/usman168"
              class="my-5 text-blue-500 text-lg text-gray-600 flex"
            >
              <div class="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20,3H4C3.447,3,3,3.448,3,4v16c0,0.552,0.447,1,1,1h16c0.553,0,1-0.448,1-1V4C21,3.448,20.553,3,20,3z M8.339,18.337H5.667	v-8.59h2.672V18.337z M7.003,8.574c-0.856,0-1.548-0.694-1.548-1.548s0.691-1.548,1.548-1.548c0.854,0,1.548,0.693,1.548,1.548	S7.857,8.574,7.003,8.574z M18.338,18.337h-2.669V14.16c0-0.996-0.018-2.277-1.388-2.277c-1.39,0-1.601,1.086-1.601,2.207v4.248	h-2.667v-8.59h2.56v1.174h0.037c0.355-0.675,1.227-1.387,2.524-1.387c2.704,0,3.203,1.778,3.203,4.092V18.337z"
                  />
                </svg>
              </div>
              LinkedIn
            </a>
          </div>
          <div class="mx-4 hidden md:block">
            <a
              href="mailto:moh.usman168@gmail.com"
              class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out w-full py-2 text-white rounded text-base"
            >
              Hire me
            </a>
          </div>
        </div>
      </div>
      <div class="md:w-2/3 p-2 w-full">
        <div class="mx-4 mb-6">
          <h1 class="mb-4 text-4xl text-gray-700 font-bold">Summary</h1>
          <p class="text-lg">
            Enthusiastically explore new technologies for efficiency, always
            looking for ways to solve the problem as efficiently as possible,
            giving priority simplicity of code.
          </p>
        </div>
        <div class="mx-4">
          <h1 class="mb-4 text-4xl text-gray-700 font-bold">Experience</h1>
          <ul>
            
            <li class="mb-4">
              <h2 class="text-2xl font-medium text-gray-800">
                Data Center Linux Sysadmin
              </h2>
              <div class="mt-1">
                <div>
                  <i class="bx bx-buildings text-sm" ></i>
                  <small class="text-base text-gray-800">
                    PT. Bonet Utama
                  </small>
                </div>
                <div>
                  <i class="bx bx-calendar text-sm" ></i>
                  <small class="text-sm text-gray-600"
                    >Agu 2017 - Okt 2018</small
                  >
                </div>
              </div>
            </li>
            <li class="mb-4">
              <h2 class="text-2xl font-medium text-gray-800">
                IT Support Internship
              </h2>
              <div class="mt-1">
                <div>
                  <i class="bx bx-buildings" ></i>
                  <small class="text-base text-gray-800">
                    PT. Nutrifood Indonesia
                  </small>
                </div>
                <div class="">
                  <i class="bx bx-calendar" ></i>
                  <small class="text-sm text-gray-600">3 Month</small>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="mx-4">
          <h1 class="mb-4 text-4xl text-gray-700 font-bold">Skill</h1>
          <ul>
            <li class="mb-6 flex flex-wrap">
              <span
                class="mr-2 my-1 rounded-full border px-4 text-sm py-2 font-medium bg-gray-200"
                >Flask</span
              >
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  </body>

{/* <body>

<div id="doc2" class="yui-t7">
<div id="inner">

  <div id="hd">
    <div class="yui-gc">
    
      <div class="yui-u first">
        <h1>{info?.basicInfo?.detail?.name}</h1>
        <h2></h2>
      </div>


      <div class="yui-u">
        <div class="contact-info">
          <h3></h3>
        </div>
      </div>
    </div>
  </div>

  <div id="bd">
    <div id="yui-main">
      <div class="yui-b">
        <div class="yui-gf">
          <div class="yui-u first">
            <h2>Experience</h2>
          </div>

          <div class="yui-u">
          {info.workExp?.details[0]?.map((item) => (
            <div class="job">
              <h2>{item.company}</h2>
              <h3>{item.jobTitle}</h3>
              <h4>{item.workDates}</h4>
              <p>{item.description} </p>
            </div>))}
          </div>
        </div>
          
        <div class="yui-gf ">
          <div class="yui-u first">
            <h2>Education</h2>
          </div>
          {info.education?.sections[0]?.map((item) => (

              <div class="yui-u">
            <h2>{item.company}</h2>
            <h3>{item.description} &mdash; </h3>
            <h4>{item.jobTitle}</h4>
            <p>{item.workDates}</p>

          </div> ))}
        </div>
      </div>
    </div>
  </div>

  <div id="ft">
    <p> &mdash; <a ></a> &mdash; </p>
  </div>

</div>


</div>


</body> */}

    
    </div>
    </div>
   



  );
});





export default Resume;

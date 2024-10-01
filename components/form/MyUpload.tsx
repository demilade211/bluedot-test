import React, { ChangeEvent, RefObject } from 'react';
import styled from 'styled-components';

// Define prop types
interface TextAreaAndLabelProps {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  classs?: string; // Optional class name
  inputRef: RefObject<HTMLInputElement>;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const TextAreaAndLabel: React.FC<TextAreaAndLabelProps> = ({
  label,
  onChange,
  classs,
  inputRef,
  selectedFiles,
  setSelectedFiles
}) => {
  return (
    <TextAreaLabelCon className={classs}>
      <Label>{label}</Label>
      <GreyTextArea onClick={() => inputRef?.current?.click()}>
        <input
          id="imageInput"
          name="media"
          type="file"
          accept="image/*"
          hidden
          ref={inputRef}
          onChange={onChange}
        />
        <svg
          className="mb-3"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 5.01398C2 4.21833 2.31607 3.45527 2.87868 2.89266C3.44129 2.33005 4.20435 2.01398 5 2.01398H19C19.7956 2.01398 20.5587 2.33005 21.1213 2.89266C21.6839 3.45527 22 4.21833 22 5.01398V11.514C21.9999 11.5983 21.9892 11.6823 21.968 11.764C21.9892 11.8456 21.9999 11.9296 22 12.014V19.014C22 19.8096 21.6839 20.5727 21.1213 21.1353C20.5587 21.6979 19.7956 22.014 19 22.014H5C4.20435 22.014 3.44129 21.6979 2.87868 21.1353C2.31607 20.5727 2 19.8096 2 19.014V16.014C2.00008 15.9296 2.01083 15.8456 2.032 15.764C2.01085 15.6823 2.0001 15.5983 2 15.514V5.01398ZM4.994 14.844C4.646 14.85 4.314 14.866 4 14.89V5.01398C4 4.74876 4.10536 4.49441 4.29289 4.30687C4.48043 4.11933 4.73478 4.01398 5 4.01398H19C19.2652 4.01398 19.5196 4.11933 19.7071 4.30687C19.8946 4.49441 20 4.74876 20 5.01398V11.03C15.703 11.169 12.6 12.204 10.42 13.653C11.246 13.946 12.17 14.363 13.076 14.909C14.475 15.749 15.897 16.929 16.854 18.492C16.9226 18.604 16.9684 18.7284 16.9888 18.8581C17.0093 18.9879 17.004 19.1203 16.9733 19.248C16.9425 19.3757 16.887 19.4961 16.8097 19.6023C16.7324 19.7085 16.635 19.7984 16.523 19.867C16.411 19.9355 16.2866 19.9813 16.1568 20.0018C16.0271 20.0223 15.8946 20.017 15.7669 19.9862C15.6393 19.9555 15.5189 19.8999 15.4127 19.8227C15.3065 19.7454 15.2165 19.648 15.148 19.536C14.412 18.333 13.27 17.358 12.046 16.623C10.824 15.889 9.581 15.431 8.719 15.231C7.50471 14.9537 6.26137 14.8241 5.016 14.845H4.994V14.844ZM6.978 6.50198C7.42372 6.18795 7.95478 6.01767 8.5 6.01398C8.91 6.01398 9.503 6.12898 10.022 6.50198C10.592 6.91198 11 7.58798 11 8.51398C11 9.43998 10.592 10.115 10.022 10.525C9.5764 10.8394 9.04533 11.01 8.5 11.014C8.09 11.014 7.497 10.899 6.978 10.525C6.408 10.115 6 9.44098 6 8.51398C6 7.58798 6.408 6.91298 6.978 6.50198Z"
            fill="#494A50"
          />
        </svg>
        <p>Click here to select an image or drop your image here</p>
      </GreyTextArea>
      {selectedFiles.length > 0 && (
        <div className="imgs-con">
          <div className="imgs">
            {selectedFiles.map((file, index) => (
              <div className="img" key={index}>
                <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} />
              </div>
            ))}
          </div>
          <p onClick={() => setSelectedFiles([])} className="clear">
            clear
          </p>
        </div>
      )}
    </TextAreaLabelCon>
  );
};

const TextAreaLabelCon = styled.div`
  margin-bottom: 20px;
  .imgs-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .imgs {
      display: flex;
      flex-wrap: wrap;
      .img {
        width: 60px;
        height: 60px;
        margin-right: 10px;
        border-radius: 12px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }
      }
    }
    .clear {
      color: red;
      cursor: pointer;
    }
  }
`;

const GreyTextArea = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 12px;
  border: 1px solid var(--grey-200, #b6b7bb);
  background: #fff;
  color: var(--pure-black, #000);
  padding: 12px 16px;
  font-weight: 400;
  font-size: 16px;
  font-family: Poppins;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  p {
    color: var(--grey-700, #101113);
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
  }
`;

const Label = styled.p`
  color: var(--grey-700, #101113);
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  text-transform: capitalize;
  margin-bottom: 8px;
`;

export default TextAreaAndLabel;

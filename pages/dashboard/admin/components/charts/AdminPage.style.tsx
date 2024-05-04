import styled from '@emotion/styled';

const CardStyledWrapper = styled.div`
  position: relative;
  && {
    .ant-card {
      /* width: auto; */
      padding: 10px 15px 0px 8px;
      background-color: white;
    }
    .ant-card-body {
      background-color: #ededed;
      /* padding: 10px 15px 0px 8px; */
    }

    .ant-card-actions {
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

export default CardStyledWrapper;

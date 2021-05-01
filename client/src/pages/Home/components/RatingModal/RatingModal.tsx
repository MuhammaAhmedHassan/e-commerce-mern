import { useEffect } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import StarRating from "react-star-ratings";
import { RootState } from "../../../../const/types";

interface Props {
  visible: boolean;
  name: string;
  changeRating: (newRating: number, name: string) => void;
  rating: number;
  onCancel(): void;
}

function RatingModal(props: Props) {
  const { visible, name, changeRating, rating, onCancel } = props;

  return (
    <Modal
      title="Leave your rating"
      centered
      visible={visible}
      footer={null}
      onCancel={onCancel}
    >
      <StarRating
        rating={rating}
        starRatedColor="teal"
        changeRating={changeRating}
        numberOfStars={5}
        isSelectable={true}
        name={name}
      />
    </Modal>
  );
}

export default RatingModal;

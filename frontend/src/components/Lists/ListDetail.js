import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getList } from "../../store/lists";

const ListDetail = () => {
    const dispatch = useDispatch();
    const { listId } = useParams();

    useEffect(() => {
        dispatch(getList(listId))
    }, [dispatch]);

    let list = useSelector(state => state.lists.currList);
    if (!list) return null;


    return (
        <>
            <p>{list.name}</p>
        </>
    )
}

export default ListDetail;
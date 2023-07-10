import React from "react";

const SearchListItem = (props) => {
    const { listSearchItem } = props;
    return (
        <>
            {listSearchItem?.map((item, index) => {
                return (
                    <div className="searchList-item d-flex my-3" key={index}>
                        <div className="searchList-item-img d-flex mr-2 align-items-center">
                            <img src={item.image_url} alt={item.name} />
                        </div>
                        <div className="searchList-item-info d-flex justify-content-between">
                            <div className="info-room mr-3">
                                <h2 className="info-room-name my-2">
                                    {item.name}
                                </h2>
                                <div className="info-room-position my-2">
                                    {item.distance} from center
                                </div>
                                <div className="info-room-transport my-2">
                                    {item.tag}
                                </div>
                                <div className="info-room-description my-2">
                                    {item.description}
                                </div>
                                <div className="info-room-equipment my-2">
                                    {item.type}
                                </div>
                                {item.free_cancel && (
                                    <>
                                        <div className="info-room-cancel my-2">
                                            Free cancellation
                                        </div>
                                        <div className="info-room-cancel-description my-2">
                                            You can cancel later, so look in
                                            this
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="info-service d-flex flex-column justify-content-between mg-2">
                                <div className="info-rate d-flex justify-content-between">
                                    <h4 className="info-rate-description ">
                                        {item.rate_text}
                                    </h4>
                                    <div className="info-rate-point">
                                        {item.rate}
                                    </div>
                                </div>
                                <div className="infor-price  d-flex flex-column align-items-end">
                                    <div className="infor-price-number">
                                        ${item.price}
                                    </div>
                                    <div className="infor-price-description my-2">
                                        Includes taxes and frees
                                    </div>
                                    <button className="btn btn-primary btn-br btn-fullwidth">
                                        See availability
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default SearchListItem;

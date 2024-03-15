import buildings from "../../../../assests/Home Page/strom_img.jpg";

const UserCreated = ({ data }) => {
  return (
    <>
      <div className="dashboard-body">
        <div className="dashboard-inner">
          <div className="row">
            <div className="col-lg-8 ">
              <div className="company-details-wrap">
                <h3 className="txt-start copany-sub-headtag">{data?.name}</h3>
                <p className="txt-start">Tagline</p>
                <div className="company-cin-main d-flex justify-content-start mt-30">
                  <p className="company-cin-num">User Designation</p>
                  <p className="ml-30 company-cin-val">{data?.designation}</p>
                </div>
                <div className="company-details-inner mt-30">
                  <div className="d-flex justify-space-between mt-10">
                    <div className="company-sub-details-width">
                      <div className="d-flex justify-content-start">
                        <img src={buildings} className="basic-info-icon" />
                        <div className="industry-name">
                          <p>Contact</p>
                          <p className="copany-sub-p">
                            {data?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="company-sub-details-width ml-10">
                      <div className="d-flex justify-content-start">
                        <img src={buildings} className="basic-info-icon" />
                        <div className="industry-name">
                          <p>Employee Role</p>
                          <p className="copany-sub-p">
                            {data?.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCreated;

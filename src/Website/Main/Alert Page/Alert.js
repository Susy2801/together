import "./Alert.css";

function AlertPage() {
  return (
    <div className="alert__container">
      <div className="alert__box container">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Ơ cái gì đây?
        </button>

        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content bg-dark">
              <div class="modal-header">
                <h1
                  class="modal-title fs-5 text-warning"
                  id="staticBackdropLabel"
                >
                  Bạn không có quyền xem trang này
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body text-info">Liên hệ admin để cấp quyền</div>
              <div class="modal-footer d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Đã hiểu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertPage;

import { ref } from "vue";
import axios from "axios";
import useUtil from "./useUtil";

const useServiceReceiver = () => {
  const { alertFetchError } = useUtil.useUtil();

  const serviceReceiverList = ref([]);
  const serviceReceiverTotal = ref(0);

  const testAxiosGetReceiveOrder = () => {
    axios
      .post(`https://inventorydev.thaibevapp.com/inventoryapi/api/v1/receiptorder/list`, {
        orderType: "",
        ownerCode: "Thaibev",
        page: 1,
        pageSize: 30,
        receiptCode: "",
        refNo: "",
        status: "",
        supplier: "",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const getServiceReceiver = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        testAxiosGetReceiveOrder(); // TestAxios

        serviceReceiverList.value.push({
          workflowId: 1,
          createDate: "01/02/2023",
          requireDate: "01/03/2023",
          workflowName: "แจ้งพิมพ์ประกาศนียบัตร น.ศ 2022",
          status: "เสร็จสิ้น",
          modifyBy: "สายชล ศรแก้ว",
        });
        serviceReceiverList.value.push({
          workflowId: 2,
          createDate: "14/02/2023",
          requireDate: "27/03/2023",
          workflowName: "โครงการ SSA และ สมัคร สมาชิก",
          status: "รอตรวจงาน",
          modifyBy: "สายชล ศรแก้ว",
        });
        serviceReceiverList.value.push({
          workflowId: 3,
          createDate: "08/03/2023",
          requireDate: "15/04/2023",
          workflowName: "เครื่องมือใหม่ทางการแพทย์ ปี 2023",
          status: "เสร็จสิ้น",
          modifyBy: "เจริญรัฐ เอื้อสาย",
        });
        serviceReceiverList.value.push({
          workflowId: 4,
          createDate: "13/03/2023",
          requireDate: "18/04/2023",
          workflowName: "แผนปฎิบัติงานศึกษานวัตกรรมเลือดกรุ๊ป",
          status: "เสร็จสิ้น",
          modifyBy: "แสงใจ แก้วจันทรา",
        });
        serviceReceiverList.value.push({
          workflowId: 5,
          createDate: "03/03/2023",
          requireDate: "27/04/2023",
          workflowName: "แมลงรุ่นใหม่ กับเซรุ่มป้องกัน",
          status: "เสร็จสิ้น",
          modifyBy: "พิพัฒ ทำนง",
        });
        serviceReceiverTotal.value = serviceReceiverList.value.length;
        resolve(serviceReceiverList);
      }, 2000);
    });
  };

  return {
    serviceReceiverList,
    serviceReceiverTotal,
    getServiceReceiver,
  };
};

export default { useServiceReceiver };

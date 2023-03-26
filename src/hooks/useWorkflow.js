import { ref } from "vue";
const useWorkflow = () => {
  const workflowList = ref([]);
  const workflowTotal = ref(0);

  const getWorkflow = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        workflowList.value.push({
          workflowId: 1,
          createDate: "01/02/2023",
          requireDate: "01/03/2023",
          workflowName: "แจ้งพิมพ์ประกาศนียบัตร น.ศ 2022",
          status: "เสร็จสิ้น",
          modifyBy: "สายชล ศรแก้ว",
        });
        workflowList.value.push({
          workflowId: 2,
          createDate: "14/02/2023",
          requireDate: "27/03/2023",
          workflowName: "โครงการ SSA และ สมัคร สมาชิก",
          status: "รอตรวจงาน",
          modifyBy: "สายชล ศรแก้ว",
        });
        workflowList.value.push({
          workflowId: 3,
          createDate: "08/03/2023",
          requireDate: "15/04/2023",
          workflowName: "เครื่องมือใหม่ทางการแพทย์ ปี 2023",
          status: "เสร็จสิ้น",
          modifyBy: "เจริญรัฐ เอื้อสาย",
        });
        workflowTotal.value = workflowList.value.length;
        resolve(workflowList);
      }, 2000);
    });
  };

  return {
    workflowList,
    workflowTotal,
    getWorkflow,
  };
};

export default { useWorkflow };

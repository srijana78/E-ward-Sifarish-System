import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import ChairpersonHistoryList from "./ChairpersonHistoryList";

const ChairpersonApproved = () => {
  const { t } = useTranslation();
  return (
    <ChairpersonHistoryList
      path="chairperson/approved"
      label={t("chairpersonHistory.approvedLabel")}
      title={t("chairpersonHistory.approvedTitle")}
      description={t("chairpersonHistory.approvedDescription")}
      icon={CheckCircle2}
      badgeClass="bg-green-50 text-green-700"
    />
  );
};

export default ChairpersonApproved;
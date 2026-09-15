import { useTranslation } from "react-i18next";
import { XCircle } from "lucide-react";
import ChairpersonHistoryList from "./ChairpersonHistoryList";

const ChairpersonRejected = () => {
  const { t } = useTranslation();

  return (
    <ChairpersonHistoryList
      label={t("chairpersonHistory.rejectedLabel")}
      title={t("chairpersonHistory.rejectedTitle")}
      description={t("chairpersonHistory.rejectedDescription")}
      icon={XCircle}
      badgeClass="bg-red-50 text-red-700"
      applications={[]}
      loading={false}
      error=""
    />
  );
};

export default ChairpersonRejected;
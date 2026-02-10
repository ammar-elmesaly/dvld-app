import { PersonDTO } from "@dvld/shared/src/dtos/person.dto";
import styles from "./LicenseHistoryInfo.module.css";
import PersonInfo from "../PersonInfo/PersonInfo";
import Switch from "../../Switch/Switch";
import { useEffect, useState } from "react";
import { LicenseDTO } from "@dvld/shared/src/dtos/license.dto";
import { InternationalLicenseDTO } from "@dvld/shared/src/dtos/internationalLicense.dto";
import ManageLocalLicensesTable from "../../Tables/ManageLocalLicenses";
import ManageInternationalLicensesTable from "../../Tables/ManageInternationalLicenses";
import { RowActionDef, ActiveRowAction, LocalLicensesActionType, InternationalLicensesActionType } from "../../../types/table";
import Overlay from "../../Overlay/Overlay";
import DriverLicenseInfo from "../DriverLicenseInfo/DriverLicenseInfo";
import { getLicenseWithPersonById } from "../../../api/license/license";
import { LicensePersonDTO } from "@dvld/shared/src/dtos/licensePerson.dto";
import { getInternationalLicenseById } from "../../../api/license/intLicense";
import { InternationalLicenseInfo } from "../InternationalLicenseInfo/InternationalLicenseInfo";

interface LicenseHistoryInfoProps {
  person?: PersonDTO;
  localLicenses: LicenseDTO[];
  internationalLicenses: InternationalLicenseDTO[];
}

export function LicenseHistoryInfo({ person, localLicenses, internationalLicenses }: LicenseHistoryInfoProps) {
  const [intLicenseOpen, setIntLicenseOpen] = useState(false);
  const [openMenuRow, setOpenMenuRow] = useState<string | null>(null);
  const [activeLocalAction, setActiveLocalAction] = useState<ActiveRowAction<LicenseDTO, LocalLicensesActionType>>(null);
  const [activeIntAction, setActiveIntAction] = useState<ActiveRowAction<InternationalLicenseDTO, InternationalLicensesActionType>>(null);
  
  const [licenseWithPerson, setLicenseWithPerson] = useState<LicensePersonDTO | undefined>(undefined);
  const [internationalLicense, setInternationalLicense] = useState<InternationalLicenseDTO | undefined>(undefined);

  useEffect(() => {
    if (!activeLocalAction?.row) return;
    getLicenseWithPersonById(activeLocalAction.row.id).then(setLicenseWithPerson);
  }, [activeLocalAction]);

  useEffect(() => {
    if (!activeIntAction?.row) return;
    getInternationalLicenseById(activeIntAction.row.id).then(setInternationalLicense);
  }, [activeIntAction]);

  const localRowActions: RowActionDef<LicenseDTO, LocalLicensesActionType>[] = [
    {
      type: LocalLicensesActionType.ShowLicense,
      handler: (row: LicenseDTO) => setActiveLocalAction({ row, type: LocalLicensesActionType.ShowLicense })
    }
  ];

  const internationalRowActions: RowActionDef<InternationalLicenseDTO, InternationalLicensesActionType>[] = [
    {
      type: InternationalLicensesActionType.ShowLicense,
      handler: (row: InternationalLicenseDTO) => setActiveIntAction({ row, type: InternationalLicensesActionType.ShowLicense })
    }
  ];

  let selectedAction: React.ReactNode = null;

  if (activeLocalAction?.type === LocalLicensesActionType.ShowLicense) {
    selectedAction = (
      <>
        <h1>View License</h1>
        {licenseWithPerson && <DriverLicenseInfo licenseWithPerson={licenseWithPerson} />}
      </>
    );
  } else if (activeIntAction?.type === InternationalLicensesActionType.ShowLicense) {
    selectedAction = (
      <>
        <h1>View International License</h1>
        {internationalLicense && (
          <InternationalLicenseInfo internationalLicense={internationalLicense} />
        )}
      </>
    );
  }

  return (
    <section className={styles.form}>
      <h2 className={styles.sectionHeader}>License History Info</h2>

      <div className={styles.mainLayout}>
        <div className={styles.fieldsContainer}>
          <div className={styles.personInfoRow}>
            <PersonInfo person={person} />
          </div>
          <div className={styles.localInternationalRow}>
            <span className={`${styles.label} ${!intLicenseOpen ? styles.active : ''}`}>
              Local
            </span>
            <Switch
              id="license-type"
              isOn={intLicenseOpen}
              handleToggle={() => setIntLicenseOpen(!intLicenseOpen)}
            />
            <span className={`${styles.label} ${intLicenseOpen ? styles.active : ''}`}>
              International
            </span>
          </div>
          { 
            intLicenseOpen
            ? <ManageInternationalLicensesTable 
                internationalLicenses={internationalLicenses}
                openMenuRow={openMenuRow}
                setOpenMenuRow={setOpenMenuRow}
                rowActions={internationalRowActions}
              />
            : <ManageLocalLicensesTable 
                licenses={localLicenses}
                openMenuRow={openMenuRow}
                setOpenMenuRow={setOpenMenuRow}
                rowActions={localRowActions}
              />
          }
        </div>
      </div>
      
      {(activeLocalAction || activeIntAction) && (
        <Overlay 
          open={activeLocalAction !== null || activeIntAction !== null} 
          onClose={() => {
            setActiveLocalAction(null);
            setActiveIntAction(null);
          }}
        >
          {selectedAction}
        </Overlay>
      )}
    </section>
  );
}
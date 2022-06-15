import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import Layout from "../components/Layouts/Layout";
import Select, { SingleValue } from "react-select";
import { Form, Formik } from "formik";
import { CalculationTypes } from "../model/CalculationActivity";
import {
  useCreateCalculationActivityMutation,
  useGetCalculationActivitiesQuery,
} from "../redux/api/calculationActivityApi";
import toast from "react-hot-toast";
import Button from "../components/Buttons/Button";
import { useAppSelector } from "../redux/hooks";
import { CSVLink } from "react-csv";
import moment from "moment";
import DataTable from "react-data-table-component";

type Props = {};

interface CalculationOptsInterface {
  label: string;
  value: any | null;
}

const calculationOptions: CalculationOptsInterface[] = [
  { label: "Persegi", value: "persegi" },
  { label: "Segitiga", value: "segitiga" },
  { label: "Lingkaran", value: "lingkaran" },
  { label: "Kubus", value: "kubus" },
  { label: "Limas", value: "limas" },
  { label: "tabung", value: "tabung" },
];

type PersegiProps = {
  sisi1: string;
  sisi2: string;
  setSisi1: Dispatch<SetStateAction<string>>;
  setSisi2: Dispatch<SetStateAction<string>>;
};
type SegitigaProps = {
  alas: string;
  setAlas: Dispatch<SetStateAction<string>>;
  tinggi: string;
  setTinggi: Dispatch<SetStateAction<string>>;
};

const PersegiComponent = ({
  sisi1,
  setSisi1,
  setSisi2,
  sisi2,
}: PersegiProps) => {
  return (
    <Fragment>
      <div className="flex gap-4 items-center justify-center">
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sisi 1
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Sisi 1"
            onChange={(e) => setSisi1(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sisi 2
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Sisi 2"
            onChange={(e) => setSisi2(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full text-center">
        <p>Hasil {Number(sisi1) * Number(sisi2) + " cm"}</p>
      </div>
    </Fragment>
  );
};
const SegitigaComponent = ({
  alas,
  setAlas,
  tinggi,
  setTinggi,
}: SegitigaProps) => {
  return (
    <Fragment>
      <div className="flex gap-4 items-center justify-center">
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Alas
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Alas"
            onChange={(e) => setAlas(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tinggi
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Tinggi"
            onChange={(e) => setTinggi(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full text-center">
        <p>Hasil {0.5 * (Number(alas) * Number(tinggi)) + " cm"}</p>
      </div>
    </Fragment>
  );
};

type LingkaranProps = {
  jari: string;
  setJari: Dispatch<SetStateAction<string>>;
};

const LingkaranComponent = ({ jari, setJari }: LingkaranProps) => {
  return (
    <Fragment>
      <div className="flex gap-4 items-center justify-center">
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Jari - Jari
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Jari - Jari"
            onChange={(e) => setJari(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full text-center">
        <p>Hasil {3.14 * (Number(jari) * 2) + " cm"}</p>
      </div>
    </Fragment>
  );
};

const KubusComponent = () => {};

const CalculationPage = (props: Props) => {
  const [selectedCalculationOption, setSelectedCalculationOpt] = useState<
    SingleValue<CalculationOptsInterface>
  >(calculationOptions[0]);
  const [sisi1, setSisi1] = useState<string>("");
  const [sisi2, setSisi2] = useState<string>("");
  const [alas, setAlas] = useState<string>("");
  const [jari, setJari] = useState<string>("");

  const [tinggi, setTinggi] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth.data);

  const { data } = useGetCalculationActivitiesQuery({});

  console.log(data);

  const initialValues: CalculationTypes = {
    calculation_name: "",
    result_value: 0,
    user_id: user.id,
  };

  const [createCalculationActivity] = useCreateCalculationActivityMutation();

  const handleSubmitInputCalculationActivity = useCallback(
    (values: CalculationTypes) => {
      values.calculation_name = selectedCalculationOption?.value;
      if (sisi1 && sisi2) {
        values.result_value = Number(sisi1) * Number(sisi2);
      }

      createCalculationActivity(values)
        .unwrap()
        .then(() => {
          toast.success("Calculation Created Succesfully");
        })
        .catch(() => toast.error("Error createing "));
    },
    [sisi1, sisi2, alas, tinggi, selectedCalculationOption]
  );

  const columns = [
    {
      name: "Nama",
      selector: (row: any) => row.calculation_name,
      sortable: true,
    },
    {
      name: "Hasil",
      selector: (row: any) => row.result_value,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row: any) => moment(row.created_at).format("L"),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row: any) => moment(row.updated_at).format("L"),
      sortable: true,
    },
  ];

  const headers = [
    {
      label: "Nama",
      key: "calculation_name",
    },
    {
      label: "Hasil",
      key: "result_value",
    },
    {
      label: "Tanggal Dibuat",
      key: "created_at",
    },
    {
      label: "Tanggal Update",
      key: "updated_at",
    },
  ];

  const exportCSVProps = {
    filename: "export.csv",
    headers: headers,
    data: data,
  };

  const handleChangeSelectRows = ({ selectedRows }: any) => {
    console.log("Selected Rows: ", selectedRows);
  };

  const renderChangeInputCal = (
    params: SingleValue<CalculationOptsInterface>
  ) => {
    switch (params?.value) {
      case "persegi":
        return (
          <PersegiComponent
            sisi1={sisi1}
            setSisi1={setSisi1}
            sisi2={sisi2}
            setSisi2={setSisi2}
          />
        );
      case "segitiga":
        return (
          <SegitigaComponent
            alas={alas}
            setAlas={setAlas}
            tinggi={tinggi}
            setTinggi={setTinggi}
          />
        );
      case "lingkaran":
        return <LingkaranComponent jari={jari} setJari={setJari} />;
      default:
        return "foo";
    }
  };
  return (
    <Layout>
      <div className="bg-section">
        <Select
          defaultValue={calculationOptions[0]}
          options={calculationOptions}
          className="w-64"
          onChange={(val) => setSelectedCalculationOpt(val)}
        />
        <div className="mt-6">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmitInputCalculationActivity}
          >
            {() => (
              <Form>
                <Fragment>
                  {renderChangeInputCal(selectedCalculationOption)}
                  <Button type="submit" bgColor="blue-500">
                    Submit Data
                  </Button>
                </Fragment>
              </Form>
            )}
          </Formik>
        </div>
        <CSVLink {...(exportCSVProps as any)}>
          <Button type="button" bgColor="red-500">
            Export to CSV
          </Button>
        </CSVLink>

        <DataTable
          columns={columns}
          data={data as any}
          pagination
          onSelectedRowsChange={handleChangeSelectRows}
        />
      </div>
    </Layout>
  );
};

export default CalculationPage;

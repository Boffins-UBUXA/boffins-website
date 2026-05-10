import { ServiceDivisionDetailPage } from "@/components/service-division-detail-page"
import { getServiceDivisionDetailData, getStaticServiceDivisionDetailData } from "@/lib/api/service-division-detail"

export default async function HardwarePage() {
  try {
    return <ServiceDivisionDetailPage data={await getServiceDivisionDetailData("hardware")} />
  } catch (error) {
    console.error("Failed to fetch hardware division:", error)
    return <ServiceDivisionDetailPage data={getStaticServiceDivisionDetailData("hardware")} />
  }
}

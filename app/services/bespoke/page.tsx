import { ServiceDivisionDetailPage } from "@/components/service-division-detail-page"
import { getServiceDivisionDetailData, getStaticServiceDivisionDetailData } from "@/lib/api/service-division-detail"

export default async function BespokePage() {
  try {
    return <ServiceDivisionDetailPage data={await getServiceDivisionDetailData("bespoke")} />
  } catch (error) {
    console.error("Failed to fetch bespoke division:", error)
    return <ServiceDivisionDetailPage data={getStaticServiceDivisionDetailData("bespoke")} />
  }
}

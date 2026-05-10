import { ServiceDivisionDetailPage } from "@/components/service-division-detail-page"
import { getServiceDivisionDetailData, getStaticServiceDivisionDetailData } from "@/lib/api/service-division-detail"

export default async function MediaPage() {
  try {
    return <ServiceDivisionDetailPage data={await getServiceDivisionDetailData("media")} />
  } catch (error) {
    console.error("Failed to fetch media division:", error)
    return <ServiceDivisionDetailPage data={getStaticServiceDivisionDetailData("media")} />
  }
}

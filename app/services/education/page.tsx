import { ServiceDivisionDetailPage } from "@/components/service-division-detail-page"
import { getServiceDivisionDetailData, getStaticServiceDivisionDetailData } from "@/lib/api/service-division-detail"

export default async function AcademyPage() {
  try {
    return <ServiceDivisionDetailPage data={await getServiceDivisionDetailData("education")} />
  } catch (error) {
    console.error("Failed to fetch education division:", error)
    return <ServiceDivisionDetailPage data={getStaticServiceDivisionDetailData("education")} />
  }
}
